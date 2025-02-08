import React from "react";

const ServicesSection = () => {
    return (
        <section className="bg-gradient-to-r from-teal-200 to-blue-300 text-gray-900 py-16">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-bold mb-10">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <h5 className="text-2xl font-semibold mb-3 text-teal-600">Test</h5>
                        <p className="text-lg">Test yourself and know your Mental health</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <h5 className="text-2xl font-semibold mb-3 text-teal-600">Counseling</h5>
                        <p className="text-lg">Get personalized counseling from experienced professionals.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                        <h5 className="text-2xl font-semibold mb-3 text-teal-600">Resources</h5>
                        <p className="text-lg">Access a variety of resources to support your mental health.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
