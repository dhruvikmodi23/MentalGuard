import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const workshops = [
  {
    title: "Mindfulness & Meditation",
    description: "Learn the basics of mindfulness and meditation in this introductory workshop. Perfect for beginners and those looking to enhance their practice.",
    image: "/mindfulness.jpg",
  },
  {
    title: "Stress Management Techniques",
    description: "Discover effective strategies to manage stress and improve your mental health. This workshop offers practical tips and exercises.",
    image: "/management.jpg",
  },
  {
    title: "Building Resilience",
    description: "Develop resilience and the ability to bounce back from adversity. This workshop is designed to help you strengthen your mental and emotional toughness.",
    image: "/resilience.jpg",
  },
];

const Workshops = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-teal-400 to-teal-100 text-teal-800">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-4">Workshops</h1>
        <p className="text-center text-lg mb-8">
          Our workshops are designed to provide practical skills and knowledge to help you navigate various aspects of
          mental health and well-being. Join us to learn, grow, and connect with others on the same journey.
        </p>
        <Row>
          {workshops.map((workshop, index) => (
            <Col md={4} key={index} className="mb-8">
              <div className="workshop-card overflow-hidden rounded-lg shadow-lg transition-transform transform hover:translate-y-[-10px]">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h5 className="text-xl font-semibold mb-3">{workshop.title}</h5>
                  <p className="text-base leading-relaxed">{workshop.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Workshops;
