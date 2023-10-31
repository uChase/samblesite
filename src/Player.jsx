import React, { useState, useEffect, useRef } from 'react';
import Pellet from './Pellet';

const Player = ({position, setPosition}) => {
    const centerX = window.innerWidth / 2 - 75; // Subtract half the width of the player
    const centerY = window.innerHeight / 2 - 75; // Subtract half the height of the player

    // const audioRef = useRef(new Audio('shot.mp3')); // Adjust the path if your file is located elsewhere

  
    // Set the initial position to the center
  const moving = useRef({ w: false, a: false, s: false, d: false });

  const handleMovement = () => {
    let deltaX = 0;
    let deltaY = 0;


    
    if (moving.current.w) deltaY = -2.4;
    if (moving.current.a) deltaX = -2.4;
    if (moving.current.s) deltaY = 2.4;
    if (moving.current.d) deltaX = 2.4;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['w', 'a', 's', 'd'].includes(e.key)) {
        moving.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (['w', 'a', 's', 'd'].includes(e.key)) {
        moving.current[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const animationFrameId = requestAnimationFrame(function animate() {
      handleMovement();
      requestAnimationFrame(animate);
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures effect runs only once


 

    // State to manage the visibility of the gun
  const [isGunVisible, setIsGunVisible] = useState(false);

  // Effect for handling the "shoot" action
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        // setIsGunVisible(true); // Show the gun when the space key is pressed
        // If you also want to handle the shooting logic, you can do it here
             // Play the shooting sound
            //  audioRef.current.play();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setIsGunVisible(false); // Hide the gun when the space key is released
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Don't forget to remove the event listeners to avoid memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const gunStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    // Adjust the position values so that the gun image aligns correctly with your player
    left: `${position.x - 5}px`,
    top: `${position.y + 110}px`,
    transform: 'translate(-50%, -50%)', // Adjust as needed
    display: isGunVisible ? 'block' : 'none', // Only display the gun if isGunVisible is true
  };

  const playerStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: 'blue',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (<div>
    <img src='fat.jpg' style={playerStyle} />
        <img src="gun.png" style={gunStyle} alt="Gun" />


  </div>);
};

export default Player;

