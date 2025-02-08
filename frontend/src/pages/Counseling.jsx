import React from 'react';

const Counseling = () => {
  return (
    <div className="bg-gradient-to-br from-[#D4F1F4] to-[#75E6DA] py-16 text-[#05445E]">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Personalized Counseling</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src="counseling.jpg"
              alt="Counseling Session"
              className="w-full rounded-lg mb-6"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-4">
              At MindWell, we believe that mental health is a crucial aspect of overall well-being. Our personalized
              counseling services are designed to help you navigate life's challenges with the support of
              experienced professionals. Whether you're dealing with anxiety, depression, stress, or relationship
              issues, our counselors are here to guide you towards a healthier, more balanced life.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Our counseling approach is client-centered, meaning we tailor our sessions to meet your unique needs and
              goals. We offer a range of services, including individual therapy, couples counseling, and family
              therapy, ensuring that you receive the type of support that best suits your situation.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              During your sessions, you can expect a safe, confidential, and non-judgmental environment where you can
              openly discuss your thoughts and feelings. Our goal is to empower you with the tools and strategies
              needed to overcome obstacles and achieve personal growth.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Our Counseling Services?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Experienced and compassionate counselors</li>
            <li>Flexible scheduling, including evening and weekend appointments</li>
            <li>Personalized treatment plans</li>
            <li>Confidential and supportive environment</li>
            <li>Holistic approach to mental health</li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            If you're ready to take the first step towards better mental health, we're here to support you every step
            of the way. Schedule your first session today and begin your journey towards healing and growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counseling;
