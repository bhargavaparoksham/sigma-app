import React, { useState, useEffect } from "react";

const HeadingCarousel = () => {
  const headings = [
    "Make new friends in the real world.",
    "Simplify your social life.",
    "Experience life together.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <div className="min-h-32">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 transition-opacity duration-1000 ease-in-out opacity-100">
        {headings[currentIndex]}
      </h2>
    </div>
  );
};

export default HeadingCarousel;
