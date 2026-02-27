import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from './../MyPages/Footer';
import Header from './../MyComponents/Header';
import bg_science from './../images/scienceimg.gif';
import bg_default from './../images/coursecatbg.png';
import vol from "./../images/volume.png";
import profile from "./../images/profile.png";
import { useSpeechSynthesis } from "react-speech-kit";

// Static Data Dictionary for Courses
const COURSE_DATA = {

    // -------- SCIENCE --------
    science: {
        title: "Science",
        bg: bg_science,
        catalog: [
            {
                title: "Environmental Science-1",
                imgSrc: "/evs.png",
                description: "5 Lessons",
                spoken: "Environmental Science-1. It contains 12 lessons.",
                instructor: {
                    name: "Aayush Talreja",
                    imgSrc: "https://media.licdn.com/dms/image/C4D03AQGjVJnZjakikg/profile-displayphoto-shrink_200_200/0/1657648501282?e=1685577600&v=beta&t=GZVLCtCI6mAVh0T4uTBJODcNWased_DRS3pxg73A7Vk",
                },
                link: "/videos",
            },
            {
                title: "Environmental Science-2",
                imgSrc: "/evs.png",
                description: "5 Lessons",
                spoken: "Environmental Science-2. It contains 12 lessons.",
                instructor: {
                    name: "Niranjan Yeole",
                    imgSrc: "https://media.licdn.com/dms/image/C4E03AQFMaAxosx5O8A/profile-displayphoto-shrink_100_100/0/1642847850390?e=1685577600&v=beta&t=LDCn4WpFeU6vUMdAP6e9nQf4Cdz4DNs6zvy52GHkwVI",
                },
                link: "/videos",
            },
            {
                title: "Science Quizzes",
                imgSrc: "/evs.png",
                description: "Practice Quizzes",
                spoken: "Science Quizzes. This section contains practice quizzes for Environmental Science.",
                instructor: {
                    name: "Anuj Bagad",
                    imgSrc: "https://media.licdn.com/dms/image/C4D03AQG7ln3Kb53VZA/profile-displayphoto-shrink_100_100/0/1641273867979?e=1685577600&v=beta&t=QRlrRpePXwAuUynmY0zhCahF2ZU4cKns6uUqbDMdIZE",
                },
                link: "/videos",
            },
        ]
    },

    // -------- MATHEMATICS --------
    mathematics: {
        title: "Mathematics",
        bg: bg_default,
        catalog: [
            {
                title: "Basics of Mathematics",
                imgSrc: "/math.png",
                description: "12 Lessons",
                spoken: "Basics of Mathematics. It contains 12 lessons.",
                instructor: {
                    name: "Mansi Bellani",
                    imgSrc: "https://media.licdn.com/dms/image/D4D03AQG3tgMaLVMfug/profile-displayphoto-shrink_100_100/0/1666875030217?e=1685577600&v=beta&t=vfoT736oR7cZXkuDcl9J6ZSnJIOaJzpkaJ1D-Y6qh_0",
                },
                link: "/videos",
            },
            {
                title: "Simplified Mathematics",
                imgSrc: "/math.png",
                description: "5 Lessons",
                spoken: "Simplified Mathematics. It contains 12 lessons.",
                instructor: {
                    name: "Shams Tabrez",
                    imgSrc: profile,
                },
                link: "/videos",
            },
            {
                title: "Mathematics Quizzes",
                imgSrc: "/math.png",
                description: "Practice Quizzes",
                spoken: "Mathematics Quizzes. This section contains practice quizzes for Mathematics.",
                instructor: {
                    name: "Shams Tabrez",
                    imgSrc: profile,
                },
                link: "/videos",
            }
        ]
    },

    // -------- ENGLISH --------
    english: {
        title: "English",
        bg: bg_default,
        catalog: [
            {
                title: "English",
                imgSrc: "/eng.jpg",
                description: "10 Lessons",
                spoken: "English. It contains 10 lessons.",
                instructor: {
                    name: "Shams Tabrez",
                    imgSrc: profile,
                },
                link: "/videos",
            },
            {
                title: "English Grammar",
                imgSrc: "/enggram.jpg",
                description: "5np Lessons",
                spoken: "English Grammar. It contains 10 lessons.",
                instructor: {
                    name: "Shams Tabrez",
                    imgSrc: profile,
                },
                link: "/videos",
            },
            {
                title: "English Quizzes",
                imgSrc: "/eng.jpg",
                description: "Practice Quizzes",
                spoken: "English Quizzes. This section contains practice quizzes for English.",
                instructor: {
                    name: "Shams Tabrez",
                    imgSrc: profile,
                },
                link: "/videos",
            }
        ]
    }
};

function Course() {
    const { subject } = useParams();
    const navigate = useNavigate();
    const { speak } = useSpeechSynthesis();
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        // Dynamic refresh of state when subject param changes
        const normalizedKey = subject?.toLowerCase();
        if (COURSE_DATA[normalizedKey]) {
            setCourseData(COURSE_DATA[normalizedKey]);
        } else {
            // If course doesn't exist, handle gracefullly
            navigate("/coursecat");
        }
    }, [subject, navigate]);

    if (!courseData) return <div>Loading course data...</div>;

    return (
        <div>
            <Header />
            <div>
                <img src={courseData.bg} alt={`${courseData.title} background`} width={"100%"} height="400" className="acc1" />
                <div className="position-relative"></div>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <p className="text-warning display-3 fw-semibold"></p>
                    <p className="text-white fs-3 fw-light my-1"></p>
                </div>
            </div>

            {/* Dynamic Course Catalogue */}
            <div className="m-3">
                <h2 className="text-3xl font-bold text-center mt-4">{courseData.title} Courses</h2>
                <div className="flex flex-wrap gap-5 pt-5 justify-center">
                    {courseData.catalog.map((card, index) => (
                        <div className="card shadow-lg" style={{ width: "18rem" }} key={index}>
                            <img src={card.imgSrc} className="card-img-top object-cover h-48" alt={card.title} />
                            <div className="font-semibold text-gray-700 card-body bg-sky-200 rounded-b-lg">
                                <h5 className="card-title fs-4">{card.title}</h5>
                                <button onClick={() => speak({ text: card.spoken || card.description })} className="my-2 hover:opacity-80 transition-opacity">
                                    <img src={vol} alt="Hear description" className="w-8 h-8" />
                                </button>
                                <p className="p-2 card-text">{card.description}</p>
                                <div className="p-2 card-text flex items-center gap-3">
                                    <img className="w-10 h-10 rounded-full object-cover" src={card.instructor.imgSrc} alt={card.instructor.name} />
                                    <span>{card.instructor.name}</span>
                                </div>
                                {/* Dynamically passing the course name to the videos route for context */}
                                <Link to={`/videos?course=${encodeURIComponent(card.title)}`} className="btn btn-outline-primary mt-3 w-full">
                                    Enroll
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Course;
