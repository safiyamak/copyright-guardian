export const Hero = () => {
  return (
    <section className="relative h-screen flex items-start justify-center pt-32 overflow-hidden bg-black">
      <img
        src="/src/assets/hero-bg.svg"
        alt="Hero background"
        className="absolute inset-0 w-full h-[100%] object-cover z-0 opacity-100 translate-y-[25%]"
      />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 max-sm:text-3xl">
          AI-Powered Copyright Guardian
        </h1>
        <p className="text-white text-xl md:text-2xl mb-6 max-w-2xl mx-auto max-sm:text-lg">
          Monitor and protect your intellectual property with our AI-powered
          tools.
        </p>
        <button
          className="text-white text-lg md:text-xl font-medium bg-gradient-to-r from-gray-500/50 to-gray-600/70 border border-white cursor-pointer px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
          onClick={() => (window.location.href = "dashboard")}
        >
          Go to dashboard
        </button>
      </div>
    </section>
  );
};
