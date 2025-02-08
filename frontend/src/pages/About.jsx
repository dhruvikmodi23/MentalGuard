import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-200 to-teal-200 text-gray-900 py-16 px-6 md:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-12">
          MindWell is dedicated to improving mental health and well-being. Our
          mission is to provide guidance and support through personalized
          counseling, workshops, and a variety of resources. MindWell aims to make
          Leeds a mentally healthy and caring city where everyone enjoys a full
          life, feels connected, and has easy access to mental health support and
          advice.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Mission and Vision</h2>
        <p className="text-lg leading-relaxed mb-12">
          At MindWell, our mission is to provide accessible and compassionate
          mental health support to individuals of all backgrounds. We envision a
          world where mental health is prioritized, and everyone has the resources
          they need to thrive. We want to remove the barriers to accessing mental
          health and wellbeing support in Leeds – focusing on helping those who
          need it most. We’re here to help everyone understand their options and
          find support when they need it, ensure everyone has the best tools and
          information for caring for their mental health and wellbeing, and
          encourage open and understanding conversations about mental health,
          free from stigma, discrimination, and prejudice.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
        <p className="text-lg leading-relaxed mb-8">
          If you have any questions or need support, please feel free to contact
          us. We are here to help you.
        </p>
        <a
          href="/contact"
          className="text-lg font-semibold text-teal-600 hover:underline"
        >
          Contact us
        </a>
      </div>
      <div className="max-w-4xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="space-y-6">
          <div className="text-lg font-medium">Ismail Kalvani - Lead Counselor</div>
          <div className="text-lg font-medium">Tofik Vepari - Workshop Coordinator</div>
          <div className="text-lg font-medium">Megha Macchi - Workshop Coordinator</div>
        </div>
      </div>
    </div>
  );
};

export default About;
