'use client';

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'

const PersonalInfo = ({ session }) => {

    const data = [
        {
            title: 'Email:',
            value: session?.user?.email,
        }
    ]
  return (
<Card className='mt-12'>
      <CardHeader>
        <CardTitle>Personal Info</CardTitle>
      </CardHeader>

      <CardContent>
        {data.map(({ title, value }) => (
          <div key={title} className='flex'>
            <p className='mr-2'>{title}</p>
            <p>{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default PersonalInfo