export const About = () => {
  return (
    <section id="about" className="max-w-[900px] mx-auto px-10 py-16">
      <h2 className="text-[#4713B6] text-2xl font-bold mb-10">
        About Copyright Guardian
      </h2>
      <div className="flex gap-14 items-start max-md:flex-col">
        <div className="flex-1">
          <p className="text-black text-lg mb-8 leading-relaxed">
            Every day, millions of creators face the risk of having their work
            stolen or misused online. At Copyright Guardian, we believe your
            intellectual property deserves full protection. Copyright Guardian
            is an AI-powered tool designed to help artists, musicians, writers,
            and content creators monitor and protect their work. Using advanced
            image recognition and blockchain technology, our platform detects
            unauthorized use and provides you with the tools to take action.
            Whether you're an independent artist or a large media company,
            Copyright Guardian gives you peace of mind knowing your creative
            work is protected. Join us today and take control of your
            intellectual property!
          </p>
          <button
            className="text-white text-lg bg-[#814CF2] cursor-pointer px-8 py-3 rounded-[100px] border-4 border-[#4713B6] relative overflow-hidden group"
            onClick={() => (window.location.href = "#dashboard")}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Go to dashboard
            </span>
            <span className="absolute inset-0 bg-[#6b3fd4] w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
          </button>
        </div>
        <img
          src="src/assets/cat-about-us.jpeg"
          alt="About illustration"
          className="w-[350px] h-auto rounded-[30px] object-cover max-lg:w-full"
        />
      </div>
    </section>
  );
};
