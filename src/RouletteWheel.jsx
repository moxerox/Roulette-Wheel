import React, { useState } from 'react';

const RouletteWheel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Function to start the spinning effect
  const startSpinning = () => {
    setIsSpinning(true);
    let currentIndex = activeIndex;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      setActiveIndex(currentIndex);
    }, 100); // Change the number to adjust the speed of highlighting

    // Stop spinning after 4 seconds and highlight the final item
    setTimeout(() => {
      clearInterval(intervalId);
      selectRandomItem();
      setIsSpinning(false);
    }, 4000);
  };

  // Function to select a random item
  const selectRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setActiveIndex(randomIndex);
  };

  // Calculate the rotation for each item based on its index
  const calculateRotation = (index) => {
    const degreesPerItem = 360 / items.length;
    return degreesPerItem * index;
  };

  return (
    <div className="relative h-64 w-64">
      <div className="absolute inset-0 flex justify-center items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 flex justify-center items-center text-lg font-semibold rounded-full transform ${
              index === activeIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            style={{
              transform: `rotate(${calculateRotation(index)}deg) translate(100px) rotate(-${calculateRotation(index)}deg)`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="absolute -bottom-16 left-1/2 transform -translate-x-1/2" onClick={startSpinning} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default RouletteWheel;
