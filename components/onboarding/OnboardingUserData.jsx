'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const OnboardingUserData = ({ session }) => {
  const searchParams = useSearchParams();
  const priceId = searchParams.get('priceId');

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(session?.user?.email);

  const pricingData = {
    price_1Qvg4yP4LCUvUb2VxfS1oNST:
      'https://buy.stripe.com/test_aEU16W3UH8uWfNm6or',
    price_id_2: '<STRIPE_LINK>',
    price_id_3:
      '<STRIPE_LINK>',
    price_id_4: '<STRIPE_LINK>',
  };

  const router = useRouter();

  const changeName = (e) => {
    setName(e.target.value);
  };

  const setUserData = async () => {
    console.log('SETTING USER DATA...');
    // update user data in mongodb
    try {
      await fetch(
        `/api/user`,
        {
          method: 'POST',
          body: JSON.stringify({
            name
          })
        }
      );
    } catch (error) {
      console.error('Error saving language and level: ', error);
    }

    // redirect to next onboarding step (payment screen)
    router.push(`${pricingData[priceId]}?prefilled_email=${email}`);
  };

  return (
    <div>
      <section id='onboarding' className='container py-24 sm:py-32'>
        <div className='w-fit mx-auto mb-8'>
          <Image width={235} height={199} src='/welcome.svg' alt='Welcome Image' />
        </div>

        <h2 className='text-3xl md:text-4xl font-bold text-center'>
          Let's Tailor Your Experience!
        </h2>
        <h3 className='text-xl text-center text-muted-foreground pt-4 pb-8'>
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        reiciendis. */}
        </h3>

        <div className='mx-auto md:w-6/12 mb-8'>
          <Card>
            <CardHeader className='text-center'>
              <CardTitle>What is Your Name?</CardTitle>
              <CardDescription>
                Enter your name so we can personalize your experience!
              </CardDescription>
            </CardHeader>

            <CardContent className='mx-auto text-center'>
            <input name="name" placeholder='Your Name' className="md:w-1/2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" onChange={(value) => changeName(value)} />
            </CardContent>
          </Card>
        </div>

        <div className='mt-10 w-fit mx-auto'>
          <Button
            onClick={setUserData}
            disabled={ !name }
          >
            Continue <ChevronRight />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OnboardingUserData;
