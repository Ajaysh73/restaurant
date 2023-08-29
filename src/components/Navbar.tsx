import React from 'react';
import Menu from './Menu';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='h-12 items-center text-red-500 p-4 flex justify-between border-b-2 border-b-red-500 uppercase '>
      {/* //LOGO */}
      <div className='text-xl'>
        <Link href='/'>ANTONIO'S</Link>
      </div>
      {/* //MOBILE MENU */}
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
