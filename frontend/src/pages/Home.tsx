import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

const Home = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Inclusive+Sans:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
