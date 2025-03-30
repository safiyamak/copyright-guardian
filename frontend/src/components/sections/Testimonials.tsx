const TestimonialCard = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <div className="flex-1 relative">
    <div className="text-white text-[120px] absolute -top-14 left-0 opacity-60 font-serif">
      "
    </div>
    <div className="text-white text-base pt-12 relative z-10 font-['Inclusive_Sans']">
      <span>{quote}</span>
      <div className="text-sm mt-4 font-['Inclusive_Sans']">
        – {author}, {role}
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "As an independent artist, I always worried about my work being stolen online. Copyright Guardian gave me the tools to detect unauthorized use and take action. Now, I feel confident sharing my creations!",
      author: "Samantha L.",
      role: "Digital Illustrator",
    },
    {
      quote:
        "I was shocked to find one of my songs being used without permission in a viral video. Thanks to Copyright Guardian's Music Similarity Detection, I was able to claim my rights and receive proper credit!",
      author: "Jake M.",
      role: "Music Producer",
    },
    {
      quote:
        "The blockchain-based social media platform is a game-changer! Knowing my posts are secured and timestamped has made a huge difference in protecting my designs from plagiarism.",
      author: "Samantha L.",
      role: "Digital Illustrator",
    },
  ];

  return (
    <section className="bg-[#232323] py-16">
      <div className="max-w-[900px] mx-auto px-10">
        <h2 className="text-white text-2xl font-bold text-center mb-12">
          User Testimonials
        </h2>
        <div className="flex gap-10 max-md:flex-col">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-stretch">
              <TestimonialCard {...testimonial} />
              {index < testimonials.length - 1 && (
                <div className="w-[1px] h-[200px] bg-[#D8D8D8] max-md:hidden mx-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
