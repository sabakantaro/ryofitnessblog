import { TrophyIcon } from '@heroicons/react/24/solid';

function Logo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div>
      <TrophyIcon className='text-[#F7AB0A]' />
    </div>
  );
}

export default Logo;
