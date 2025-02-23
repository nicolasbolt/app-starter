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
    const user = await User.findOne({ email: serverSession.user.email });

    console.log('User GET request successful');
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in User GET request ', error);
  }
})

export const POST = auth(async function POST(req) {
  console.log('RUNNING: POST /api/user');
  const serverSession = await getServerSession(auth);

  if (!req.auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: serverSession.user.email });

    await user.save();

    const body = {
      message: 'User POST request successful',
    };
    return NextResponse.json(body);
  } catch (error) {
    console.error('Error in User POST request: ', error);
  }
})
