import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-blue-900 to-teal-500 text-white py-20 text-left">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
                <div className="md:w-1/2">
                    <h1 className="text-5xl font-bold mb-4">Welcome to RenewU</h1>
                    <p className="text-lg mb-6">Your mental health is our priority. Get guidance and support here.</p>
                    <a href="/login" className="bg-teal-400 text-blue-900 px-6 py-2 rounded-md text-lg hover:bg-teal-300">Get Started</a>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                    <img src="/hero1.webp" alt="Hero" className="rounded-lg w-full max-w-md mx-auto" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
