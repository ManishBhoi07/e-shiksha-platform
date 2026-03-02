import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDeaf, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../MyComponents/Header';

const AccessibilitySelection = () => {
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const currentlySpeaking = useRef("");

    const handleVoiceFeedback = (text) => {
        if (!window.speechSynthesis) return;

        if (window.speechSynthesis.speaking && currentlySpeaking.current === text) {
            return;
        }

        window.speechSynthesis.cancel();
        currentlySpeaking.current = text;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1;

        utterance.onend = () => {
            if (currentlySpeaking.current === text) {
                currentlySpeaking.current = "";
            }
        };

        window.speechSynthesis.speak(utterance);
    };

    const handleSelection = (mode) => {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        setIsRedirecting(true);
        localStorage.setItem('accessibilityMode', mode);
        // Smooth transition delay before redirect
        setTimeout(() => {
            navigate('/home');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />
            <motion.div
                className="container px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRedirecting ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative inline-block">
                            <span className="relative">Select Accessibility Mode</span>
                        </span>
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Choose an accessibility mode to help tailor the application experience to your specific needs.
                    </p>
                </div>

                <div className="flex flex-col mx-auto mt-8 sm:w-8/12 lg:w-3/5 gap-8">
                    {/* Deaf Support Card */}
                    <div
                        onClick={() => handleSelection('deaf')}
                        className="flex flex-col mx-2 overflow-hidden bg-white rounded-lg shadow-xl hover:shadow-sm hover:cursor-pointer md:flex-row w-full transition-shadow duration-300 group"
                        aria-label="Deaf Login"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSelection('deaf') }}
                        onMouseEnter={() => handleVoiceFeedback('Deaf Login')}
                        onFocus={() => handleVoiceFeedback('Deaf Login')}
                    >
                        <div className="flex items-center justify-center w-full h-48 md:w-1/3 bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                            <FaDeaf className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col justify-center w-full px-6 py-6 text-gray-800 md:w-2/3">
                            <h3 className="text-2xl font-semibold leading-tight uppercase mb-2">
                                Deaf Support
                            </h3>
                            <p className="text-gray-600 mb-4 text-lg">
                                Visual aids, structured layouts, and clearly signed options designed for the deaf and hard of hearing.
                            </p>
                            <span className="inline-flex items-center font-semibold transition-colors duration-200 text-blue-400 hover:text-blue-800">
                                Select Mode <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12"><path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path></svg>
                            </span>
                        </div>
                    </div>

                    {/* Blind Support Card */}
                    <div
                        onClick={() => handleSelection('blind')}
                        className="flex flex-col mx-2 overflow-hidden bg-white rounded-lg shadow-xl hover:shadow-sm hover:cursor-pointer md:flex-row w-full transition-shadow duration-300 group"
                        aria-label="Blind Login"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSelection('blind') }}
                        onMouseEnter={() => handleVoiceFeedback('Blind Login')}
                        onFocus={() => handleVoiceFeedback('Blind Login')}
                    >
                        <div className="flex items-center justify-center w-full h-48 md:w-1/3 bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                            <FaEyeSlash className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col justify-center w-full px-6 py-6 text-gray-800 md:w-2/3">
                            <h3 className="text-2xl font-semibold leading-tight uppercase mb-2">
                                Blind Support
                            </h3>
                            <p className="text-gray-600 mb-4 text-lg">
                                Screen reader optimization and extensive voice navigation options designed for visually impaired users.
                            </p>
                            <span className="inline-flex items-center font-semibold transition-colors duration-200 text-blue-400 hover:text-blue-800">
                                Select Mode <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12"><path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path></svg>
                            </span>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default AccessibilitySelection;
