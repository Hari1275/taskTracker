import React from 'react';

import Image from 'next/image';
import { AvatarPhoto } from '../components/AvatarPhoto';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
function Navbar() {
  return (
    <>
      <div className='flex  justify-between items-center shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md'>
        <div className='px-5 py-2'>
          <Image src='/hk.svg' width={75} height={75} alt='Task Management' />
        </div>

        <div className='p-5'>
          <div className='flex justify-between items-center gap-4'>
            <Button size='sm' variant='outline' asChild>
              <Link href={'/sign-in'}>Login</Link>
            </Button>
            <Button className='text-center hidden md:block' asChild>
              <Link href={'/sign-up'}>Get Started for Free</Link>
            </Button>

            <ModeToggle />
          </div>
        </div>
        {/* <div className='px-5 py-2'>
          <AvatarPhoto />
        </div> */}
      </div>
    </>
  );
}

export default Navbar;
