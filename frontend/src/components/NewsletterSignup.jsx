import React, { useState } from 'react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup email:', email);
        setEmail('');
    };

    return (
        <section className="bg-gradient-to-r from-blue-900 to-teal-400 text-white py-16 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-4">Stay Updated with MindWell</h2>
                <p className="text-lg mb-6">Subscribe to our newsletter to receive the latest updates, articles, and resources on mental health.</p>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-4 py-2 text-black rounded-md w-full md:w-1/3 border border-gray-300"
                    />
                    <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md w-full md:w-auto">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSignup;
