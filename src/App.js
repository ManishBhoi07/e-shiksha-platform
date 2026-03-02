import './App.css';
import './index.css';
import './mic.css';
import Header from './MyComponents/Header';
import Home from './MyPages/Home';
import Hero from './MyPages/Hero';
import Coursecat from './MyPages/Coursecat';
import Aboutus from './MyPages/Aboutus';
import Donation from './MyPages/Donation';
import Ngoenroll from './MyComponents/Ngoenroll';
import AccessibilitySelection from './MyPages/AccessibilitySelection';
import ProtectedRoute from './MyComponents/ProtectedRoute';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Videos from './MyComponents/Videos';
import Sidebarvideo from './MyComponents/Sidebarvideos';
import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Lead from "./MyComponents/leaders"
import Login from './MyComponents/login'
import Popup from './MyComponents/popup'
import Banner from './MyComponents/banner'
import Profile from './MyPages/profile'
import Course from './MyPages/Course'
import VoiceNav from "./MyComponents/VoiceNav"
import Quiz from "./MyPages/Quiz"
import { inject } from '@vercel/analytics';
inject();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const commands = [
    {
      command: "open *",
      callback: (website) => {
        navigate("/" + website.split(" ").join(""));
      },
    },
    {
      command: "go to *",
      callback: (website) => {
        navigate("/" + website.split(" ").join(""));
      },
    },
    {
      command: "open courses",
      callback: () => {
        navigate("/coursecat");
      },
    },
    {
      command: "enroll for *",
      callback: () => {
        navigate("/videos");
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "stop",
      callback: () => {
        stopHandle();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  const handleListing = () => {
    setIsListening(true);
    if (microphoneRef.current) microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: false,
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    if (microphoneRef.current) microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  // Cleanup effect when the location changes or when App unmounts
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      setIsListening(false);
    };
  }, [location.pathname]);

  const supportSpeech = SpeechRecognition.browserSupportsSpeechRecognition();

  return (
    <div className='App'>
      {supportSpeech ? <VoiceNav /> : <div className="p-2 bg-red-100 text-red-600 text-center text-sm font-semibold">Voice Navigation is not supported in this browser.</div>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/coursecat" element={<Coursecat />} />
        <Route path="/course/:subject" element={<Course />} />
        <Route path="/recruiter" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/ngoenroll" element={<Ngoenroll />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/sidebarvideo" element={<Sidebarvideo />} />
        <Route path="/video" element={<Videos />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaders" element={<Lead />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/banner" element={<Banner />} />

        {/* Protected Accessibility Routes */}
        <Route path="/accessibility" element={
          <ProtectedRoute>
            <AccessibilitySelection />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Hero />} />
      </Routes>
    </div>
  );
}

export default App;
