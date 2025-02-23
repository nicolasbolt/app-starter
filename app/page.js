import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className='container md:w-3/4 mx-auto text-center mt-10'>
      <h1 className='text-3xl'>Home Page</h1>
      <p className='text-lg mt-2'>The homepage of your app!</p>
    </div>
  );
}
