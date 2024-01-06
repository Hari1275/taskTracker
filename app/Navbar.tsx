import React from 'react';
import { AvatarPhoto } from './components/AvatarPhoto';
import Image from 'next/image';
function Navbar() {
  return (
    <>
      <div className='flex  justify-between items-center  py-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
        <div>
          <Image src='/hk.svg' width={80} height={80} alt='Task Management' />
        </div>

        {/* <p className='p-5'>


        </p> */}
        <div className='p-5'>
          <AvatarPhoto />
        </div>
      </div>
    </>
  );
}

export default Navbar;
