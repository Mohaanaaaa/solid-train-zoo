import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnimalInfo from './AnimalInfo'; // Import AnimalInfo component
import './App.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

// Importing multiple images for slider
import wildlife4 from '../src/assets/wildlife4.jpg';
import wildlife7 from '../src/assets/wildlife7.jpg';
import wildlife1 from '../src/assets/wildlife1.jpg';
import wildlife2 from '../src/assets/wildlife2.jpg';
import wildlife3 from '../src/assets/wildlife3.jpg';
import wildlife8 from '../src/assets/wildlife8.jpg';
import wildlife5 from '../src/assets/wildlife5.jpg';
import wildlife6 from '../src/assets/wildlife6.jpg';
import wildlife9 from '../src/assets/wildlife9.jpg';

// Image list with captions
const images = [
    { src: wildlife4, caption: "Explore the wilderness" },
    { src: wildlife7, caption: "The beauty of nature" },
    { src: wildlife1, caption: "A world worth saving" },
    { src: wildlife2, caption: "Experience wildlife like never before" },
    { src: wildlife3, caption: "Preserve the planet" },
    { src: wildlife8, caption: "Discover hidden gems of the wild" },
    { src: wildlife5, caption: "Nature's wonders" },
    { src: wildlife6, caption: "Feel the serenity of the forest" },
    { src: wildlife9, caption: "Connect with wildlife" },
];

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(null);

    // Automatically move to the next image every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousIndex(currentIndex);
            setCurrentIndex((currentIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <Router>
            <div>
                {/* Navigation Bar - Shared across all pages */}
                <nav className="navbar">
                    <div className="navbar-header">
                        <h1 className="navbar-title">
                            <FontAwesomeIcon icon={faPaw} size="2x" className="navbar-icon" />
                            Wild Life Info Hub
                        </h1>
                    </div>
                    <Link to="/" className="navbar-button no-underline">
                        Home
                    </Link>
                    <Link to="/animal-info" className="navbar-button no-underline">
                        Know Animal Info
                    </Link>
                </nav>

                {/* Routes */}
                <Routes>
                    {/* Main page */}
                    <Route
                        path="/"
                        element={
                            <div>
                                {/* Image Slider */}
                                <div className="slider-container">
                                    {images.map((image, index) => (
                                        <React.Fragment key={index}>
                                            <img
                                                src={image.src}
                                                alt={`Wildlife ${index + 1}`}
                                                className={`slider-image ${
                                                    index === currentIndex ? 'active' : ''
                                                } ${index === previousIndex ? 'previous' : ''}`}
                                            />
                                            {index === currentIndex && (
                                                <div className="slider-caption">{image.caption}</div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        }
                    />
                    {/* Animal Info page */}
                    <Route path="/animal-info" element={<AnimalInfo />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;