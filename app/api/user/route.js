import { NextResponse } from 'next/server';
import { auth } from "@/auth"
import User from '@/models/User';
import connectDB from '@/lib/connect-db';

export const GET = auth(async function GET(req) {
  console.log('RUNNING: GET /api/user');

  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {

    await connectDB();
    const user = await User.findOne({ email: req.auth.user.email });

    console.log('User GET request successful');
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in User GET request ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
})

export const POST = auth(async function POST(req) {
  console.log('RUNNING: POST /api/user');

  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: req.auth.user.email });

    const body = await req.json();
    console.log('Body: ', body);

    if (body.name) {
      console.log('body.name: ', body.name);
      user.username = body.name;
    }

    await user.save();

    const res_body = {
      message: 'User POST request successful',
    };
    return NextResponse.json(res_body);
  } catch (error) {
    console.error('Error in User POST request: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
})
