'use client';

import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const plans = {
    0: 'Free',
    1: 'Basic',
    2: 'Pro',
    3: 'Premium',
}

const BillingInfo = ({ session }) => { 
    const [userPlan, setUserPlan] = useState(0);

    useEffect(() => {
        if (session && session.user) {
            setUserPlan(session.user.group);
        }
        
    }, [session]);

    const data = [
        {
            title: 'Plan:',
            value: plans[userPlan],
        },
       
    ]
return (
    <Card className='mt-12'>
        <CardHeader>
            <CardTitle>Billing Info</CardTitle>
        </CardHeader>

        <CardContent>
            {data.map((item, index) => (
                <div key={index} className='flex'>
                    <p className='mr-2'>{item.title}</p>
                    <p>{item.value}</p>
                </div>
            ))}

            <div className='mt-2'>
                <Button asChild variant='outline'>
                    <Link target='_blank' href={
                session && session.user
                  ? '#' +
                    session.user.email
                  : '#'
              }>Go to Billing Dashboard</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
)
}

export default BillingInfo
