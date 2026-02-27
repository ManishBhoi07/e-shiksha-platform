import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../MyComponents/Header";
import Footer from "./Footer";

const quizData = {
    Science: {
        quiz1: [
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], answer: 1 },
            { question: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 2 },
            { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: 0 },
            { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: 2 },
            { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 }
        ],
        quiz2: [
            { question: "What is the main organ of the human circulatory system?", options: ["Lungs", "Brain", "Heart", "Liver"], answer: 2 },
            { question: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"], answer: 0 },
            { question: "Which element has the atomic number 1?", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"], answer: 2 },
            { question: "What is the process by which plants make their food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], answer: 1 },
            { question: "How many bones are in the adult human body?", options: ["206", "205", "201", "208"], answer: 0 }
        ]
    },
    Mathematics: {
        quiz1: [
            { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
            { question: "What is 8 x 9?", options: ["64", "72", "81", "90"], answer: 1 },
            { question: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
            { question: "What is 20% of 50?", options: ["5", "10", "15", "20"], answer: 1 },
            { question: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], answer: 2 }
        ],
        quiz2: [
            { question: "What is the value of Pi to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: 1 },
            { question: "What is 15 squared?", options: ["225", "125", "250", "325"], answer: 0 },
            { question: "What is the area of a rectangle with length 5 and width 4?", options: ["9", "18", "20", "25"], answer: 2 },
            { question: "Solve: 2x = 18", options: ["6", "7", "8", "9"], answer: 3 },
            { question: "What is the next prime number after 7?", options: ["8", "9", "10", "11"], answer: 3 }
        ]
    },
    English: {
        quiz1: [
            { question: "Which is a noun?", options: ["Run", "Quickly", "Cat", "Beautiful"], answer: 2 },
            { question: "Identify the verb in: 'The dog barks loud.'", options: ["The", "dog", "barks", "loud"], answer: 2 },
            { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childrens", "Childes"], answer: 1 },
            { question: "Which word is an adjective?", options: ["Happy", "Joy", "Happily", "Enjoy"], answer: 0 },
            { question: "What is the past tense of 'go'?", options: ["Goed", "Going", "Gone", "Went"], answer: 3 }
        ],
        quiz2: [
            { question: "Choose the correct article: '___ apple a day'", options: ["A", "An", "The", "No article"], answer: 1 },
            { question: "Which is a synonym for 'big'?", options: ["Small", "Tiny", "Large", "Little"], answer: 2 },
            { question: "Identify the pronoun: 'She is reading.'", options: ["She", "is", "reading", "None"], answer: 0 },
            { question: "What is the opposite of 'hot'?", options: ["Warm", "Boiling", "Cold", "Sunny"], answer: 2 },
            { question: "Which sentence is correct?", options: ["He go to school.", "He goes to school.", "He going to school.", "He gone to school."], answer: 1 }
        ]
    }
};

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type"); // quiz1 or quiz2
    const subject = searchParams.get("subject");

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuiz = quizData[subject]?.[type];

    if (!currentQuiz) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <h2 className="text-2xl font-bold">Quiz not found</h2>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-500 text-white rounded">Go Back</button>
            </div>
        );
    }

    const handleNext = () => {
        if (selectedOption === currentQuiz[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < currentQuiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setIsFinished(false);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 p-4">
                <div className="w-full max-w-2xl bg-white p-8 rounded shadow-lg border">
                    {!isFinished ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center">{subject} - {type === 'quiz1' ? "Quiz 1" : "Quiz 2"}</h2>
                            <div className="mb-4">
                                <span className="text-gray-500 font-semibold">Question {currentQuestionIndex + 1} of {currentQuiz.length}</span>
                                <h3 className="text-xl font-medium mt-2">{currentQuiz[currentQuestionIndex].question}</h3>
                            </div>

                            <div className="space-y-3 mb-6">
                                {currentQuiz[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedOption(index)}
                                        className={`w-full text-left p-3 rounded border transition-colors ${selectedOption === index ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={selectedOption === null}
                                className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {currentQuestionIndex === currentQuiz.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                            <p className="text-xl mb-6">Your Score: <span className="font-bold text-blue-600">{score}</span> out of {currentQuiz.length}</p>

                            <div className="flex justify-center space-x-4">
                                <button onClick={handleRetake} className="px-6 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700">Retake Quiz</button>
                                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Back to Course</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Quiz;
