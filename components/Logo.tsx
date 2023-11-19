import Image from 'next/image';

function Logo(props: any) {
  const { renderDefault, title } = props;

  return (
    <Image
      src='/images/ryofitness-logo.png'
      alt={title}
      width={50}
      height={50}
      className='rounded-full'
    />
  );
}

export default Logo;
