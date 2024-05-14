import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RouletteWheel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinMode, setSpinMode] = useState('normal'); // 'normal' or 'crazy'

  // Function to start the spinning effect
  const startSpinning = () => {
    setIsSpinning(true);
    if (spinMode === 'normal') {
      normalSpin();
    } else {
      crazySpin();
    }
  };

  // Normal spin function
  const normalSpin = () => {
    let currentIndex = activeIndex;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      setActiveIndex(currentIndex);
    }, 50); // Speed of spinning

    // Stop spinning after 4 seconds and highlight the final item
    setTimeout(() => {
      clearInterval(intervalId);
      selectRandomItem();
      setIsSpinning(false);
    }, 4000);
  };

  // Crazy spin function
  const crazySpin = () => {
    let currentIndex = activeIndex;
    let spinCount = 0;
    const baitTimes = Math.floor(Math.random() * 2) ? 3 : 5; // Randomly choose to bait 3 or 5 times
    const maxSpins = items.length * 15; // Total spins before stopping
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      setActiveIndex(currentIndex);
      spinCount++;
  
      // Perform the bait-and-switch after maxSpins
      if (spinCount >= maxSpins) {
        clearInterval(intervalId);
        performBaitAndSwitch(baitTimes);
      }
    }, 50); // Speed of spinning
  };
  
  // Function to perform the bait-and-switch effect
  const performBaitAndSwitch = (baitTimes) => {
    let baitCount = 0;
    const baitInterval = setInterval(() => {
      let baitIndex = Math.floor(Math.random() * items.length);
      setActiveIndex(baitIndex);
      baitCount++;
      if (baitCount >= baitTimes) {
        clearInterval(baitInterval);
        selectRandomItem();
        setIsSpinning(false);
      }
    }, 700); // Delay between each bait
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
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
        <label>
          <input type="radio" name="spinMode" value="normal" checked={spinMode === 'normal'} onChange={() => setSpinMode('normal')} />
          Normal
        </label>
        <label>
          <input type="radio" name="spinMode" value="crazy" checked={spinMode === 'crazy'} onChange={() => setSpinMode('crazy')} />
          Crazy
        </label>
      </div>
    </div>
  );
};

RouletteWheel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RouletteWheel;
