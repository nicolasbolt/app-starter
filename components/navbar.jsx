import { auth } from '@/auth';
import SignIn from '@/components/auth/sign-in';
import SignOut from '@/components/auth/sign-out';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from '@/components/ui/navigation-menu';
  
  // import ProfileDropdown from '../components/ProfileDropdown';

  export default async function Navbar() {
    const session = await auth();
    return (
      <div className='flex pl-3 py-3 justify-between bg-white'>
        <NavigationMenu className='flex-grow'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href='/'
                className={navigationMenuTriggerStyle()}
              >
                <span className='text-xl text-blue-800'>App Starter</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* ANY ADDITIONAL LINKS GO HERE */}
            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
          
        </NavigationMenu>
        <div className='pr-5'>
          {session?.user ? (
            <SignOut />
          //   {/* TODO */}
          //   {/* <Link href='/profile'> */}
          //   {/* <ProfileDropdown /> */}
          // {/* </Link> */}

          ) : (
            <SignIn />
          )}
          
        </div>
      </div>
    );
  };
  