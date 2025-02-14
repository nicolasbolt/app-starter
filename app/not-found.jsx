import { CircleHelp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='md:w-6/12 w-11/12 mx-auto mt-20 text-center'>
      <CircleHelp size={64} strokeWidth={1} className='mx-auto mb-2' />
      <h1 className='text-3xl mb-2'>404 - Page Not Found</h1>
      <Link className='text-blue-800 underline hover:text-blue-700 transition' href='/'>Go Back to the Dashboard</Link>
    </div>
  )
}

export default NotFound
