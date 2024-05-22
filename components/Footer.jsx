import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-blue-700 py-4'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0'>
          <Image src={logo} alt='Logo' className='h-8 w-auto' />
        </div>

        <div>
          <p className='text-sm text-white mt-2 md:mt-0'>
            &copy; {currentYear} Fazwaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
