import React from 'react';

import Image from 'next/image';
import { AvatarPhoto } from '../components/AvatarPhoto';
function Navbar() {
  return (
    <>
      <div className='flex  justify-between items-center shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md'>
        <div className='px-5 py-2'>
          <Image src='/hk.svg' width={75} height={75} alt='Task Management' />
        </div>

        {/* <p className='p-5'>


        </p> */}
        <div className='px-5 py-2'>
          <AvatarPhoto />
        </div>
      </div>
    </>
  );
}

export default Navbar;
