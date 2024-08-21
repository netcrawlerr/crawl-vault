const Hero = () => {
  return (
    <div className="   relative flex flex-col lg:flex-row justify-center items-center lg:justify-around  px-4 sm:px-20 py-10 gap-8 lg:gap-16">
      <div className="description flex flex-col justify-center items-start lg:items-start  text-left max-w-xl px-4 sm:px-10 lg:px-20 z-20 relative">
        <p className="text-slate-100 mb-5 text-4xl sm:text-4xl lg:text-5xl leading-snug">
          Easily Store and Access Your Passwords With This Intuitive App.
        </p>
        <p className="text-xl sm:text-2xl lg:text-3xl text-green-600">
          Your Security Simplified.
        </p>

        <a
          href="#"
          className="mt-5 rounded bg-green-600 text-center text-slate-100 py-2 text-sm sm:text-lg sm:py-3 w-[140px] sm:w-[180px] hover:bg-green-800 transition-all"
          download={true}
        >
          Download
        </a>
      </div>

      <div className="   hero flex justify-center items-center lg:justify-start relative">
        <img
          src="/screen2.jpg"
          className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[400px] z-10"
          alt="App screen"
        />
      </div>
    </div>
  );
};

export default Hero;
