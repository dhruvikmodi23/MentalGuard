import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-teal-500 to-blue-900 text-white py-6 text-center">
            <div className="container mx-auto">
                <p className="m-0">&copy; 2025 MindWell. All rights reserved.</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <a href="#" className="text-white text-xl hover:text-teal-300 transition-colors">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="text-white text-xl hover:text-teal-300 transition-colors">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="text-white text-xl hover:text-teal-300 transition-colors">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
