import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import User from '@/models/User';
import connectDB from '@/lib/connect-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  console.log('Starting Stripe Webhook...');

  await connectDB();

  const body = await req.text();

  const signature = headers().get('stripe-signature');

  let data;
  let eventType;
  let event;

  console.log('Verifying Stripe Event...');
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  console.log('Stripe Event Verified');

  data = event.data;
  eventType = event.type;

  console.log('data: ', data);
  console.log('eventType: ', eventType);

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        console.log('Entering Checkout Session Completed...');
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        let user;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ['line_items'],
          }
        );
        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;

        console.log(
          `Values from the Stripe Session, customerId: ${customerId}, customer: ${customer}, priceId: ${priceId}`
        );

        if (customer.email) {
          // TODO don't use email for this
          user = await User.findOne({ email: customer.email });

          console.log('User from DB: ', user);

          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
              customerId,
            });

            await user.save();
          }
        } else {
          console.error('No user found');
          throw new Error('No user found');
        }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.priceId = priceId;
        user.customerId = customerId;
        // TODO as more pricing options are added, this need to change based on what option they selected
        user.group = 1;
        await user.save();

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case 'customer.subscription.deleted': {
        console.log('Entering Customer Subscription Deleted...');
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );

        const user = await User.findOne({
          customerId: subscription.customer,
        });

        console.log('User from DB before changes: ', user);

        // Revoke access to your product
        user.group = 0;

        console.log('User from DB after changes: ', user);
        await user.save();

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error('stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType);
  }

  return NextResponse.json({});
}
