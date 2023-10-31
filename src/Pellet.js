// Pellet.js
import React, { useEffect } from "react";

const Pellet = ({ initialPosition, target, onReachTarget, reportPosition }) => {
  // State for the pellet's position
  const [position, setPosition] = React.useState(initialPosition);

  useEffect(() => {
    // Calculate the direction vector towards the target (mouse position)
    const dirX = target.x - initialPosition.x;
    const dirY = target.y - initialPosition.y;

    // Normalize the direction vector
    const length = Math.sqrt(dirX * dirX + dirY * dirY);
    const normX = dirX / length;
    const normY = dirY / length;

    // Move the pellet in the direction of the target
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newX = prev.x + normX * 5; // 5 is the speed of the pellet
        const newY = prev.y + normY * 5;

        // Check if the pellet has gone off-screen or reached its target
        if (
          newX < 0 ||
          newX > window.innerWidth ||
          newY < 0 ||
          newY > window.innerHeight
        ) {
          clearInterval(interval);
          onReachTarget(); // Call the passed-in function to remove this pellet
        }
        reportPosition({ x: newX, y: newY }); // <-- report the new position to the parent

        return { x: newX, y: newY };
      });
    }, 10); // Adjust interval time for frame rate

    return () => clearInterval(interval); // Cleanup
  }, []); // Empty dependency array ensures this effect runs once per component instance

  // Style for the pellet (could be an image or a shape like a circle)
  const pelletStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "50%", // Makes it circular
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return <div style={pelletStyle} />;
};

export default Pellet;
