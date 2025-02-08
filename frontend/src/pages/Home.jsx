import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Blog from "./Blog";
import Footer from "../components/Footer";
import NewsletterSignup from "../components/NewsletterSignup";

const Home = () => {
  return (
    <div className="font-poppins">
      <HeroSection />
      <ServicesSection />
      {/* <TestimonialsSection /> */}
      <Blog />
      {/* <NewsletterSignup /> */}
      <Footer />
    </div>
  );
};

export default Home;
