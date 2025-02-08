import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Services = () => {
  return (
    <Container className="relative py-16 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-400 text-teal-800">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-teal-400 text-teal-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h5 className="text-2xl font-semibold">Counseling</h5>
          <p>Get personalized counseling from experienced professionals.</p>
        </div>
        <div className="bg-teal-400 text-teal-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h5 className="text-2xl font-semibold">Workshops</h5>
          <p>Join our workshops to improve your mental well-being.</p>
        </div>
        <div className="bg-teal-400 text-teal-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h5 className="text-2xl font-semibold">Resources</h5>
          <p>Access a variety of resources to support your mental health.</p>
        </div>
      </div>
    </Container>
  );
};

export default Services;
