import React from "react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "MindWell has completely changed my life. The counseling services are top-notch!",
            name: "Hammad Mansuri",
            image: "/A.jpg"
        },
        {
            quote: "The workshops offered are insightful and have helped me improve my mental health.",
            name: "Hanzala Mansuri",
            image: "/B.jpg"
        },
        {
            quote: "I appreciate the resources available at MindWell. They've been incredibly helpful.",
            name: "Israr Khan",
            image: "/C.jpg"
        }
    ];

    return (
        <section className="bg-gradient-to-r from-teal-400 to-blue-300 text-gray-900 py-16">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-bold mb-10">What Our Clients Say</h2>
                <div className="overflow-hidden relative w-full">
                    <div className="flex animate-slide">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-none w-full text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow mx-4"
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <p className="italic text-lg mb-3">"{testimonial.quote}"</p>
                                <p className="font-semibold text-teal-700">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
