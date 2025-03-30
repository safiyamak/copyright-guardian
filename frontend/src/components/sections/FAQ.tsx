import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";

const faqItems = [
  {
    question: "What types of content can Copyright Guardian protect?",
    answer:
      "Copyright Guardian can protect various types of digital content including images, artwork, music, videos, written content, and more. Our AI-powered system is designed to monitor and detect unauthorized use across multiple platforms.",
  },
  {
    question:
      "What happens if Copyright Guardian detects unauthorized use of my content?",
    answer:
      "When unauthorized use is detected, you'll receive an immediate notification with details about the usage. Our platform provides tools to help you take appropriate action, from sending takedown notices to initiating legal proceedings.",
  },
  {
    question: "How does the Art Theft Detection work?",
    answer:
      "Our Art Theft Detection system uses advanced AI and image recognition technology to scan the internet for copies or modifications of your artwork. It can detect even partially modified versions of your work.",
  },
  {
    question: "Can I use this for music samples?",
    answer:
      "Yes! Our audio fingerprinting technology can detect unauthorized use of your music, including samples and remixes. The system works across major streaming platforms and social media sites.",
  },
];

export const FAQ = () => {
  return (
    <section className="max-w-[900px] mx-auto px-10 py-16">
      <h2 className="text-[#4713B6] text-2xl font-bold text-center mb-12">
        FAQ
      </h2>
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#814CF2] p-6 rounded-lg hover:bg-[#6b3fd4] transition-colors hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="text-white text-lg font-bold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white text-base mt-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a06eae5b287ab660b2b3d2a4ed6749ae715a7af8"
              alt=""
              className="w-[60px] h-[60px] float-right mt-[-60px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
