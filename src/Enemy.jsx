import React, { useState, useEffect, useRef } from 'react';

const Enemy = ({ playerPosition, reportPosition }) => {
  // Function to generate a random starting position off-screen
  const generateRandomPosition = () => {
    const buffer = 50; // The enemy starts from at least 50px outside the screen
    const randomSide = Math.floor(Math.random() * 4); // Choose a random side (0=top, 1=right, 2=bottom, 3=left)

    let xPos, yPos;

    switch (randomSide) {
      case 0: // top
        xPos = Math.random() * window.innerWidth; // Anywhere along the width
        yPos = -buffer; // Off-screen along the top edge
        break;
      case 1: // right
        xPos = window.innerWidth + buffer; // Off-screen along the right edge
        yPos = Math.random() * window.innerHeight; // Anywhere along the height
        break;
      case 2: // bottom
        xPos = Math.random() * window.innerWidth; // Anywhere along the width
        yPos = window.innerHeight + buffer; // Off-screen along the bottom edge
        break;
      case 3: // left
        xPos = -buffer; // Off-screen along the left edge
        yPos = Math.random() * window.innerHeight; // Anywhere along the height
        break;
      default:
        // Should never be default, but just in case, set it to top-left
        xPos = -buffer;
        yPos = -buffer;
    }

    return { x: xPos, y: yPos };
  };

  // Function to select a random image for the enemy
  const selectRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * 6) + 1; // Generates a number from 1 to 6
    return `e${imageNumber}.jpg`; // Returns a string like "w1.jpg", "w2.jpg", etc.
  };

  // Generate initial position and image when the component is created
  const initialPosition = generateRandomPosition();

  // Using useRef to keep the image constant for the lifetime of the component
  const imageRef = useRef(selectRandomImage());

  // State for the current position of the enemy
  const [position, setPosition] = useState(initialPosition);

  const targetPosition = { x: 500, y: 500 };

  useEffect(() => {
    const moveInterval = setInterval(() => {
      // Calculate the direction vector towards the target
      const dirX = playerPosition.x - position.x;
      const dirY = playerPosition.y - position.y;

      // Normalize the direction vector
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      const normX = length !== 0 ? dirX / length : 0;
      const normY = length !== 0 ? dirY / length : 0;

      // Update the position
      setPosition((prev) => {
        const newPos = {
          x: prev.x + normX * 2,
          y: prev.y + normY * 2,
        };

        reportPosition(newPos); // <-- report the new position to the parent
        return newPos;
      });
    }, 50); // Controls the "frame rate" of the enemy movement

    return () => clearInterval(moveInterval); // Clear the interval if the component is unmounted
  }, [position]); // Removed playerPosition from the dependencies


  const enemyStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  // Using the image from the ref so it remains constant
  return <img src={imageRef.current} style={enemyStyle} />;
};

export default Enemy;
