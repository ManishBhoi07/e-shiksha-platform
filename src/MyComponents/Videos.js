import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./../MyComponents/Header";
import Footer from "./../MyPages/Footer";

// ================= COURSE VIDEO MAPPING =================

const courseVideos = {

  // -------- SCIENCE --------
  science: {
    evs1: [
      { title: "Water Pollution", url: "https://www.youtube.com/embed/MEb7nnMLcaA" },
      { title: "Air Pollution", url: "https://www.youtube.com/embed/fephtrPt6wk" },
      { title: "Ecosystem", url: "https://www.youtube.com/embed/sKJoXdrOT70" },
      { title: "Food Chain", url: "https://www.youtube.com/embed/YuO4WB4SwCg" },
      { title: "Biodiversity", url: "https://www.youtube.com/embed/rclOz8Fsbmg" }
    ],

    evs2: [
      { title: "Climate Change", url: "https://www.youtube.com/embed/NM-sgVmBL_A" },
      { title: "Global Warming", url: "https://www.youtube.com/embed/Y3gqoDUtmt4" },
      { title: "Ozone Layer", url: "https://www.youtube.com/embed/ckULkfv3Hb0" },
      { title: "Natural Disasters", url: "https://www.youtube.com/embed/HaEmIakO7f4" },
      { title: "Renewable Energy", url: "https://www.youtube.com/embed/ViXtT8c4z-c" }
    ],

    quizzes: []
  },

  // -------- MATHEMATICS --------
  mathematics: {
    basicmaths: [
      { title: "Volume", url: "https://www.youtube.com/embed/aOmxlV3bdc0" },
      { title: "Numbers", url: "https://www.youtube.com/embed/z0OIXIZKfo0" }
    ],

    simplifiedmaths: [
      { title: "What is a Circle?", url: "https://www.youtube.com/embed/SULeam8jQfE" },
      { title: "Geometry", url: "https://www.youtube.com/embed/n5vLLR5QFts" },
      { title: "Geometry Pair of Angles", url: "https://www.youtube.com/embed/CtnKXDJE_Ec" }
    ],

    quizzes: []
  },

  // -------- ENGLISH --------
  english: {
    englishbasic: [
      { title: "Parts of Speech", url: "https://www.youtube.com/embed/ZqLeGm4k6CU" },
      { title: "Tenses", url: "https://www.youtube.com/embed/kidtXq1IrC0" },
      { title: "Reading Skills", url: "https://www.youtube.com/embed/TbmSCdn_iUo" },
      { title: "Writing Skills", url: "https://www.youtube.com/embed/DuubQG3gFb8" }
    ],

    englishgrammar: []
  },

  default: []
};

// ================= COMPONENT =================

const Videos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videosArr, setVideosArr] = useState([]);
  const [videoSrc, setVideoSrc] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [courseContext, setCourseContext] = useState("");
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizSubject, setQuizSubject] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseTitle = params.get("course") || "";
    const lowerTitle = courseTitle.toLowerCase();

    if (lowerTitle.includes("science quizzes")) {
      setIsQuizMode(true);
      setQuizSubject("Science");
      return;
    }
    if (lowerTitle.includes("mathematics quizzes")) {
      setIsQuizMode(true);
      setQuizSubject("Mathematics");
      return;
    }
    if (lowerTitle.includes("english quizzes")) {
      setIsQuizMode(true);
      setQuizSubject("English");
      return;
    }

    setIsQuizMode(false);

    let resolvedArray = [];
    let resolvedContext = "";

    if (lowerTitle.includes("science-1")) {
      resolvedArray = courseVideos.science.evs1;
      resolvedContext = "Environmental Science-1";
    }
    else if (lowerTitle.includes("science-2")) {
      resolvedArray = courseVideos.science.evs2;
      resolvedContext = "Environmental Science-2";
    }
    else if (lowerTitle.includes("basics of mathematics")) {
      resolvedArray = courseVideos.mathematics.basicmaths;
      resolvedContext = "Basics of Mathematics";
    }
    else if (lowerTitle.includes("simplified mathematics")) {
      resolvedArray = courseVideos.mathematics.simplifiedmaths;
      resolvedContext = "Simplified Mathematics";
    }
    else if (lowerTitle.includes("english grammar")) {
      resolvedArray = courseVideos.english.englishgrammar;
      resolvedContext = "English Grammar";
    }
    else if (lowerTitle.includes("english")) {
      resolvedArray = courseVideos.english.englishbasic;
      resolvedContext = "English";
    }

    if (resolvedArray.length > 0) {
      setVideosArr(resolvedArray);
      setVideoSrc(resolvedArray[0].url);
      setCurrentTitle(resolvedArray[0].title);
      setCourseContext(resolvedContext);
    }

  }, [location.search]);

  return (
    <>
      <Header />

      <div className="flex flex-col md:flex-row h-screen">

        <div className="flex flex-col items-center w-full">

          {isQuizMode ? (
            <div className="w-full mt-10 flex flex-col items-center justify-center space-y-6 lg:h-[70vh]">
              <h2 className="text-4xl font-bold">{quizSubject} Quizzes</h2>
              <div className="flex space-x-6 mt-8">
                <button
                  onClick={() => navigate(`/quiz?type=quiz1&subject=${quizSubject}`)}
                  className="p-4 bg-blue-600 text-white rounded text-xl font-semibold hover:bg-blue-700 shadow-md">
                  Quiz 1 (Lessons 1-5)
                </button>
                <button
                  onClick={() => navigate(`/quiz?type=quiz2&subject=${quizSubject}`)}
                  className="p-4 bg-green-600 text-white rounded text-xl font-semibold hover:bg-green-700 shadow-md">
                  Quiz 2 (Lessons 6-10)
                </button>
              </div>
            </div>
          ) : (
            <>
              {videoSrc && (
                <iframe
                  src={videoSrc}
                  title="Course Video"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full mt-2 lg:h-[70vh] bg-black"
                />
              )}

              <div className="flex flex-col items-center mt-4 mb-4">
                <h2 className="text-2xl font-bold">{currentTitle}</h2>
                <p className="text-gray-600">{courseContext}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col w-full md:w-[350px] p-8 space-y-4 overflow-y-auto border-l-2 bg-gray-50 h-[80vh] md:h-screen">
          <h3 className="font-bold text-center text-xl pb-2 border-b-2">
            {isQuizMode ? `${quizSubject} Quizzes` : `${courseContext} Lectures`}
          </h3>

          {videosArr.map((item, index) => (
            <button
              key={index}
              className={`p-3 rounded font-semibold text-white transition-colors duration-200 ${videoSrc === item.url
                ? "bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
                }`}
              onClick={() => {
                setVideoSrc(item.url);
                setCurrentTitle(item.title);
              }}
            >
              {index + 1}. {item.title}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Videos;