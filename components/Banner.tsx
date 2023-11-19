function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10">
      <div>
        <h1 className='text-6xl'>Bulk Blog</h1>
        <h2 className='mt-5 md:mt-0'>
          Welcome to{' '}
          <span className='underline decoration-2 decoration-[#0a8cf7]'>
            Every Workout Bros
          </span>
        </h2>
      </div>

      <p className='mt-5 md:mt-2 text-gray-400 max-w-sm'>
        A blog about what I have done for body transformation from &rdquo;skinny&rdquo; to muscular
      </p>
    </div>
  );
}

export default Banner;
