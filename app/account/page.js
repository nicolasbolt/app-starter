import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PersonalInfo from '@/components/account/PersonalInfo'
import Settings from '@/components/account/Settings'
import BillingInfo from '@/components/account/BillingInfo'

const AccountPage = async () => {
    const session = await auth()

    if (!session) {
        redirect('/signin')
    }
    
    return (
        <div className='pb-8'>
            <h1 className='md:text-4xl text-3xl pt-8 text-center'>Your Account</h1>
            <div className='md:w-6/12 w-11/12 mx-auto'>
                <PersonalInfo session={session} />
                <Settings session={session} />
                <BillingInfo session={session} />
            </div>
        </div>
    )
}

export default AccountPage
