import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div>
      Home Page
    </div>
  );
}
