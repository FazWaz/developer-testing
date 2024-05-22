'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo-white.png';

const Navbar = () => {

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl py-2 px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-10 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image className='h-10 w-auto' src={logo} alt='Fazwaz real estate' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                Fazwaz 
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
