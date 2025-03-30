export const Footer = () => {
  return (
    <footer className="bg-[#814CF2]">
      <div className="max-w-[900px] mx-auto px-10 py-14">
        <div className="flex justify-between items-start max-md:flex-col max-md:gap-10">
          <div className="flex flex-col gap-5">
            <div className="text-white text-xl font-bold">
              Copyright Guardian
            </div>
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="text-white text-base hover:text-gray-200 transition-colors relative overflow-hidden group"
              >
                <span className="inline-block relative z-10">Home</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a
                href="#about"
                className="text-white text-base hover:text-gray-200 transition-colors relative overflow-hidden group"
              >
                <span className="inline-block relative z-10">About Us</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a
                href="#dashboard"
                className="text-white text-base hover:text-gray-200 transition-colors relative overflow-hidden group"
              >
                <span className="inline-block relative z-10">Dashboard</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-white text-base">
              Follow us on social media!
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/47bbe330fe2d01e8fe9153199e19b08e8cc11148"
                  alt="Social media"
                  className="w-[40px] h-[40px]"
                />
              </a>
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/80ce4b0d81591d5623ba75135b402b389b823f91"
                  alt="Social media"
                  className="w-[40px] h-[40px]"
                />
              </a>
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f6989221cad358a1c2a3721ab081e4ce3f9538b"
                  alt="Social media"
                  className="w-[40px] h-[40px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
