import React, { useState, useEffect } from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import Pellet from "./Pellet";

const About = () => {
  const [playerPosition, setPlayerPosition] = useState({
    x: window.innerWidth / 2 - 75,
    y: window.innerHeight / 2 - 75,
  });

  const [enemies, setEnemies] = useState([]);
  const [pellets, setPellets] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleEnemyPositionReport = (id, position) => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) =>
        enemy.id === id ? { ...enemy, position } : enemy
      )
    );
  };

  const handlePelletPositionReport = (id, position) => {
    setPellets((prevPellets) =>
      prevPellets.map((pellet) =>
        pellet.id === id ? { ...pellet, position } : pellet
      )
    );
  };

  const spawnEnemies = () => {
    const newEnemies = Array.from({ length: 3 }, () => ({
      id: Math.random(), // ensure a unique identifier for each enemy
      // ... other properties
    }));
    setEnemies((prevEnemies) => [...prevEnemies, ...newEnemies]);
  };

  useEffect(() => {
    const spawnInterval = setInterval(spawnEnemies, 3000);
    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleShoot = (e) => {
      if (e.code === "Space") {
        setPellets((oldPellets) => [
          ...oldPellets,
          {
            id: Math.random(), // unique identifier for each pellet
            position: { x: playerPosition.x + 75, y: playerPosition.y + 75 },
            target: { ...mousePosition },
          },
        ]);
      }
    };
    window.addEventListener("keydown", handleShoot);
    return () => window.removeEventListener("keydown", handleShoot);
  }, [playerPosition, mousePosition]);

  const handleRemovePellet = (id) => {
    setPellets((oldPellets) => oldPellets.filter((pellet) => pellet.id !== id));
  };

  const checkCollisions = () => {
    let hitPellets = [];
    let hitEnemies = [];

    enemies.forEach((enemy) => {
      const enemyBounds = {
        x: enemy.position?.x,
        y: enemy.position?.y,
        width: 50, // or actual width
        height: 50, // or actual height
      };

      pellets.forEach((pellet) => {
        const pelletBounds = {
          x: pellet.position?.x,
          y: pellet.position?.y,
          width: 10, // or actual width
          height: 10, // or actual height
        };

        const hit =
          pelletBounds.x < enemyBounds.x + enemyBounds.width &&
          pelletBounds.x + pelletBounds.width > enemyBounds.x &&
          pelletBounds.y < enemyBounds.y + enemyBounds.height &&
          pelletBounds.y + pelletBounds.height > enemyBounds.y;

        if (hit) {
          hitPellets.push(pellet.id);
          hitEnemies.push(enemy.id);
        }
      });
    });

    const remainingEnemies = enemies.filter(
      (enemy) => !hitEnemies.includes(enemy.id)
    );
    const remainingPellets = pellets.filter(
      (pellet) => !hitPellets.includes(pellet.id)
    );

    if (
      remainingEnemies.length < enemies.length ||
      remainingPellets.length < pellets.length
    ) {
      setEnemies(remainingEnemies);
      setPellets(remainingPellets);
    }
  };

  useEffect(() => {
    checkCollisions();
  }, [pellets, enemies]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ABOUT ME</h1>
        <Player position={playerPosition} setPosition={setPlayerPosition} />
        {enemies.map((enemy) => (
          <Enemy
            key={enemy.id}
            reportPosition={(pos) => handleEnemyPositionReport(enemy.id, pos)}
            playerPosition={playerPosition} /* other props for Enemy */
          />
        ))}
        {pellets.map((pellet) => (
          <Pellet
            key={pellet.id}
            initialPosition={pellet.position}
            target={pellet.target}
            onReachTarget={() => handleRemovePellet(pellet.id)}
            reportPosition={(pos) => handlePelletPositionReport(pellet.id, pos)}
          />
        ))}
      </header>
    </div>
  );
};

export default About;
