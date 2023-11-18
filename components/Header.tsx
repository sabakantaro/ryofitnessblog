import Link from 'next/link';
import { TrophyIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className='flex items-center justify-between space-x-2 font-bold px-10 py-5'>
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <TrophyIcon className='text-[#F7AB0A] h-6 w-6' />
        </Link>
        <h1 className='text-2xl'>Trophy</h1>
      </div>

      <div>
        <Link href='/' className='px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center'>
          Check out the website
        </Link>
      </div>
    </header>
  );
}

export default Header;
