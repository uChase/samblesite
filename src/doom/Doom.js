import React, { useRef, useEffect, useState, useCallback } from "react";
import GIF from "gif.js";

function Doom() {
  const [playerAlive, setPlayerAlive] = useState(true);
  const [score, setScore] = useState(0);
  let canvasRef = useRef(null);
  let miniMapRef = useRef(null);
  const playerPosition = useRef({
    x: 6,
    y: 6,
    angle: Math.PI / 4,
    alive: true,
  });
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  let firstRun = useRef(true);

  const [isMoving, setIsMoving] = useState(false);
  const bobbingEffect = useRef(0);

  const [isShooting, setIsShooting] = useState(false);
  const shootingTimeoutRef = useRef(null);

  const handleRespawn = () => {
    playerPosition.current = {
      x: 6,
      y: 6,
      angle: Math.PI / 4,
      alive: true,
    };
    movement.current = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
    setScore(0);
    scoreRef.current = 0;
    setPlayerAlive(true);
    enemies.current = [];
  };

  // This effect clears the shooting timeout if the component unmounts while shooting.
  useEffect(() => {
    return () => {
      if (shootingTimeoutRef.current) {
        clearTimeout(shootingTimeoutRef.current);
      }
    };
  }, []);

  const walltexture = useRef(null);

  useEffect(() => {
    // Load the image when the component mounts
    const img = new Image();
    img.src = "ye.png"; // Update with your image path
    img.onload = () => {
      walltexture.current = img;
    };
  }, []);

  const gunImage = useRef(null);

  useEffect(() => {
    const gunImg = new Image();
    gunImg.src = "gun.png"; // Update with your gun image path
    gunImg.onload = () => {
      gunImage.current = gunImg;
    };
  }, []);

  const currentShootFrame = useRef(1);

  const updateShootFrame = () => {
    // Check if we've reached the last frame
    if (currentShootFrame.current < 12) {
      // If not, proceed to the next frame
      currentShootFrame.current += 1;
    }
    // If it's the last frame, we don't increase the counter to avoid looping
  };

  useEffect(() => {
    let frameInterval;
    if (isShooting || isShootingRef.current) {
      // Start the animation sequence
      frameInterval = setInterval(updateShootFrame, 100); // Adjust time interval if necessary
    } else if (!isShooting || !isShootingRef.current) {
      // Shooting has stopped
      if (frameInterval) {
        clearInterval(frameInterval); // Stop the animation sequence
      }
      currentShootFrame.current = 1; // Reset the animation to the first frame
    }

    return () => {
      if (frameInterval) {
        clearInterval(frameInterval); // Ensure the interval is cleared on component cleanup
      }
    };
  }, [isShooting]);

  //ref for shoot gif images
  const shootGifImage = useRef({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
  });

  //load shoot imgs
  useEffect(() => {
    // ... (other image loading)

    const shootImg1 = new Image();
    shootImg1.src = "shootgif/1.png"; // 'shootGif' is the imported string URL
    shootImg1.onload = () => {
      shootGifImage.current["1"] = shootImg1;
    };

    const shootImg2 = new Image();
    shootImg2.src = "shootgif/2.png";
    shootImg2.onload = () => {
      shootGifImage.current["2"] = shootImg2;
    };

    const shootImg3 = new Image();
    shootImg3.src = "shootgif/3.png";
    shootImg3.onload = () => {
      shootGifImage.current["3"] = shootImg3;
    };

    const shootImg4 = new Image();
    shootImg4.src = "shootgif/4.png";
    shootImg4.onload = () => {
      shootGifImage.current["4"] = shootImg4;
    };

    const shootImg5 = new Image();
    shootImg5.src = "shootgif/5.png";
    shootImg5.onload = () => {
      shootGifImage.current["5"] = shootImg5;
    };

    const shootImg6 = new Image();
    shootImg6.src = "shootgif/6.png";
    shootImg6.onload = () => {
      shootGifImage.current["6"] = shootImg6;
    };

    const shootImg7 = new Image();
    shootImg7.src = "shootgif/7.png";
    shootImg7.onload = () => {
      shootGifImage.current["7"] = shootImg7;
    };

    const shootImg8 = new Image();
    shootImg8.src = "shootgif/8.png";
    shootImg8.onload = () => {
      shootGifImage.current["8"] = shootImg8;
    };

    const shootImg9 = new Image();
    shootImg9.src = "shootgif/9.png";
    shootImg9.onload = () => {
      shootGifImage.current["9"] = shootImg9;
    };

    const shootImg10 = new Image();
    shootImg10.src = "shootgif/10.png";
    shootImg10.onload = () => {
      shootGifImage.current["10"] = shootImg10;
    };

    const shootImg11 = new Image();
    shootImg11.src = "shootgif/11.png";
    shootImg11.onload = () => {
      shootGifImage.current["11"] = shootImg11;
    };

    const shootImg12 = new Image();
    shootImg12.src = "shootgif/12.png";
    shootImg12.onload = () => {
      shootGifImage.current["12"] = shootImg12;
    };

    // ... (rest of your useEffect)
  }, []);

  const enemyTextures = useRef({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

  const deadTexture = useRef(null);

  //enemy texturs
  useEffect(() => {
    const enemy1 = new Image();
    enemy1.src = "e1.jpg";
    enemy1.onload = () => {
      enemyTextures.current["1"] = enemy1;
    };

    const enemy2 = new Image();
    enemy2.src = "e2.jpg";
    enemy2.onload = () => {
      enemyTextures.current["2"] = enemy2;
    };

    const enemy3 = new Image();
    enemy3.src = "e3.jpg";
    enemy3.onload = () => {
      enemyTextures.current["3"] = enemy3;
    };

    const enemy4 = new Image();
    enemy4.src = "e4.jpg";
    enemy4.onload = () => {
      enemyTextures.current["4"] = enemy4;
    };

    const enemy5 = new Image();
    enemy5.src = "e5.jpg";
    enemy5.onload = () => {
      enemyTextures.current["5"] = enemy5;
    };

    const enemy6 = new Image();
    enemy6.src = "e6.jpg";
    enemy6.onload = () => {
      enemyTextures.current["6"] = enemy6;
    };

    const blood = new Image();

    blood.src = "Blood.jpg";
    blood.onload = () => {
      deadTexture.current = blood;
    };
  }, []);

  // Define an enemy object structure
  function createEnemy(x, y, texture, id) {
    return { x, y, alive: true, texture, id };
  }

  // State to hold active enemies
  const enemies = useRef([]);
  useEffect(() => {
    setTimeout(() => {
      enemies.current.forEach((enemy, index) => {
        if (!enemy.alive) {
          enemies.current.splice(index, 1);
        }
      });
    }, 1000);
  }, [isShooting]);

  //ANCHOR - Spawn enemies
  useEffect(() => {
    let spawnFreq = 1;
    let count = 0;
    const spawnInterval = setInterval(() => {
      // Get all possible spawn points from the map

      const spawnPoints = [];
      let playerPosX = Math.floor(playerPosition.current.x / TILE_LENGTH);
      let playerPosY = Math.floor(playerPosition.current.y / TILE_LENGTH);
      map.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
          if (
            tile === 0 &&
            !(rowIndex === playerPosY && colIndex === playerPosX)
          ) {
            spawnPoints.push({
              x: colIndex * TILE_LENGTH,
              y: rowIndex * TILE_LENGTH,
            });
          }
        });
      });

      // Randomly select four spawn points
      for (let i = 0; i < spawnFreq; i++) {
        if (spawnPoints.length > 0) {
          const randomPointIndex = Math.floor(
            Math.random() * spawnPoints.length
          );
          const spawnPoint = spawnPoints[randomPointIndex];

          // Create a new enemy at the spawn point with a random texture
          const enemyTextureNumber = Math.ceil(Math.random() * 6); // Assuming you have 6 enemy textures
          const newEnemy = createEnemy(
            spawnPoint.x + 2.5,
            spawnPoint.y + 2.5,
            enemyTextures.current[enemyTextureNumber + ""],
            count
          );
          count++;

          // Add the new enemy to the state
          enemies.current.push(newEnemy);

          // Remove the used spawn point from the list
          spawnPoints.splice(randomPointIndex, 1);
        }
      }
      if (spawnFreq < 5) {
        spawnFreq++;
      }
    }, 5000); // 10000ms = 10s

    return () => clearInterval(spawnInterval); // Cleanup the interval on component unmount
  }, [playerAlive]); // Empty dependency array means this useEffect runs once when component mounts

  //ANCHOR - constants
  const NUM_RAYS = 400;
  const FOV = Math.PI / 4; // Field of View
  const MAX_DISTANCE = 100;
  const WALL_HEIGHT = window.innerHeight; // Arbitrary value for wall height
  const TILE_LENGTH = 5; // Arbitrary value for tile length
  const ENEMY_SIZE = window.innerHeight;
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const castAllRays = () => {
    const rays = [];

    for (let i = -NUM_RAYS / 2; i < NUM_RAYS / 2; i++) {
      const rayAngle = playerPosition.current.angle - (FOV / NUM_RAYS) * i;

      const distance = castSingleRay2(rayAngle);
      // console.log(distance.wallSegment.mapX, distance.wallSegment.mapY);
      if (!distance.wallSegment.mapX || !distance.wallSegment.mapY) {
        // console.log(distance.wallSegment.mapX, distance.wallSegment.mapY);
      }

      if (
        distance.wallSegment.mapX === undefined ||
        distance.wallSegment.mapY === undefined
      ) {
        console.log("undefined");
      }
      rays.push({
        distance: distance.distance,
        angle: rayAngle,
        mapY: distance.wallSegment.mapY,
        mapX: distance.wallSegment.mapX,
        hitX: distance.hitX,
        hitY: distance.hitY,
        wasHitVertical: distance.wallSide === "x" ? false : true,
        hitEnemy: distance.hitEnemy,
        enemyId: distance.enemyId,
        enemyTol: distance.enemyTol,
      });
    }

    return rays;
  };

  const castSingleRay2 = (angle, isShot = false) => {
    let distance = 0;
    let hitWall = false;
    let wallSide = ""; // Will store 'x' or 'y' indicating the wall side hit
    let wallSegment;
    let hitX;
    let hitY;

    let curY = playerPosition.current.y;
    let curX = playerPosition.current.x;

    // Calculate the ray's direction vector based on the angle
    const rayDirX = Math.cos(angle);
    const rayDirY = Math.sin(angle);

    while (!hitWall && distance < MAX_DISTANCE) {
      // Adjustments to ensure we don't calculate zero distances when on boundaries
      const boundaryOffsetX =
        curX % TILE_LENGTH === 0 && rayDirX < 0
          ? -TILE_LENGTH
          : rayDirX > 0
          ? TILE_LENGTH
          : 0;
      const boundaryOffsetY =
        curY % TILE_LENGTH === 0 && rayDirY < 0
          ? -TILE_LENGTH
          : rayDirY > 0
          ? TILE_LENGTH
          : 0;

      // Calculate the next horizontal and vertical intersections
      const nextHorizTouch = curX + boundaryOffsetX - (curX % TILE_LENGTH);
      const nextVertTouch = curY + boundaryOffsetY - (curY % TILE_LENGTH);
      // console.log(nextHorizTouch);

      // Calculate distances to the next horizontal and vertical intersections
      const horizDist = (nextHorizTouch - curX) / rayDirX;
      const vertDist = (nextVertTouch - curY) / rayDirY;

      // Use the shorter distance
      const usedDist = Math.min(Math.abs(horizDist), Math.abs(vertDist));

      // Determine the wall side hit
      wallSide = Math.abs(horizDist) < Math.abs(vertDist) ? "x" : "y";

      // Move to the next intersection
      curX += usedDist * rayDirX;
      curY += usedDist * rayDirY;

      // Update the total distance travelled by the ray
      distance += usedDist;

      // Calculate the current map indices
      let mapY;
      if (rayDirY > 0 || wallSide == "x") {
        mapY = Math.floor(curY / TILE_LENGTH);
      } else {
        mapY = Math.floor(curY / TILE_LENGTH) - 1; // Use Math.floor instead of Math.ceil
      }
      let mapX;
      if (rayDirX > 0 || wallSide == "y") {
        mapX = Math.floor(curX / TILE_LENGTH);
      } else {
        mapX = Math.floor(curX / TILE_LENGTH) - 1; // Use Math.floor instead of Math.ceil
      }

      // Check map boundaries before accessing the map array
      if (mapX < 0 || mapX >= map[0].length || mapY < 0 || mapY >= map.length) {
        console.log("out of bounds");
        break; // We're out of the map bounds, exit the loop
      }

      // Check if the ray has hit a wall
      if (map[mapY][mapX] === 1) {
        hitWall = true;
      }
      wallSegment = { mapY, mapX };
      hitX = curX;
      hitY = curY;
    }

    let hitEnemy = false;
    let enemyId = null;
    let enemyTol = null;

    let enemiesToRemove = [];
    enemies.current.forEach((enemy, index) => {
      const toEnemyX = enemy.x - playerPosition.current.x;
      const toEnemyY = enemy.y - playerPosition.current.y;

      // Step 1: Calculate the dot product of the direction vector and the vector to the enemy.
      // This represents the length of the enemy vector's projection onto the direction vector.
      const dotProduct = rayDirX * toEnemyX + rayDirY * toEnemyY;

      // Step 2: Calculate the coordinates of the projection point (i.e., the point on the direction vector line).
      const projectionX = playerPosition.current.x + rayDirX * dotProduct;
      const projectionY = playerPosition.current.y + rayDirY * dotProduct;

      // Step 3: Calculate the distance from the enemy to the projection point.
      const distToLineX = enemy.x - projectionX;
      const distToLineY = enemy.y - projectionY;
      const distToLine = Math.sqrt(
        distToLineX * distToLineX + distToLineY * distToLineY
      );

      // Define a tolerance distance to check if the enemy is close enough to the line.
      let tolerance = 0.5; // This value depends on the scale of your game world.
      if (isShot) {
        tolerance = 1;
      }

      if (distToLine <= tolerance && dotProduct > 0) {
        // The enemy is close enough to the line and in front of the player.
        const eDist = Math.sqrt(toEnemyX * toEnemyX + toEnemyY * toEnemyY); // Total distance to the enemy.

        //edit based on dist to x or y positive or neagtive
        if (eDist < distance) {
          hitEnemy = true;
          if (eDist < 0.5 && enemy.alive) {
            playerPosition.current.alive = false;
            setPlayerAlive(false);
          }
          distance = eDist;
          enemyId = enemy.id;
          enemyTol = tolerance - distToLine;
          if (isShot && enemy.alive) {
            enemies.current[index].alive = false;
            enemies.current[index].texture = deadTexture.current;
            let newScore = scoreRef.current + 1;
            setScore(newScore);
            scoreRef.current = newScore;
          }

          if (
            (distToLineX > 0 && distToLineY > 0) ||
            (distToLineX < 0 && distToLineY < 0)
          ) {
            enemyTol = tolerance + 0.5 - distToLine;
          } else {
            enemyTol = tolerance + 0.5 - distToLine;
          }
        }
      }
    });
    // enemiesToRemove.forEach((index) => {
    //   enemies.current.splice(index, 1);
    // });

    // Return the distance along with the side of the wall that was hit
    return {
      distance,
      wallSide,
      wallSegment,
      hitX,
      hitY,
      hitEnemy,
      enemyId,
      enemyTol,
    };
  };

  const scoreRef = useRef(0);

  const castSingleRay = (angle) => {
    let distance = 0;
    let hitWall = false;

    while (!hitWall && distance < MAX_DISTANCE) {
      distance += 0.1;

      const testX = playerPosition.current.x + Math.cos(angle) * distance;
      const testY = playerPosition.current.y + Math.sin(angle) * distance;

      const mapX = Math.floor(testX / TILE_LENGTH);
      const mapY = Math.floor(testY / TILE_LENGTH);

      if (map[mapY][mapX] === 1) {
        hitWall = true;
      }
    }

    return distance;
  };

  const FOG_DISTANCE = 100; // This value depends on your game's scale. Adjust it to get the desired fog effect.

  const draw3DView = () => {
    if (!walltexture.current || playerPosition.current.alive === false) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Ground
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    const rays = castAllRays();

    let prevEnemyTol = null;
    let afterInflectionPoint = false;
    rays.forEach((r, i) => {
      if (r.distance === 100) return; // If distance is max, skip this ray

      if (r.hitEnemy) {
        // An enemy is hit by this ray
        const enemy = enemies.current.find((e) => e.id === r.enemyId);

        if (enemy) {
          const enemyHeight = ENEMY_SIZE / r.distance; // ENEMY_SIZE is a constant representing the enemy's size
          const enemyOffset = (canvas.height - enemyHeight) / 2;

          // Assuming enemy.texture is the image element with the loaded texture
          const enemyTexture = enemy.texture;

          // Here, we adjust the enemyTol based on its change in slope
          let normalizedHitPoint;
          if (prevEnemyTol !== null) {
            // Ensure this isn't the first frame
            if (r.enemyTol < prevEnemyTol) {
              // The slope is positive, we are after the inflection point
              normalizedHitPoint = 1 - r.enemyTol * 0.5; // This maps [0, 1] to [0.5, 1]
            } else {
              // The slope is negative, we are before the inflection point
              normalizedHitPoint = 0.5 * r.enemyTol; // This maps [0, 1] to [0, 0.5]
            }
          } else {
            // For the first frame, we can default to the middle of the texture or another suitable default
            normalizedHitPoint = 0.5;
          }

          // Remember the current enemyTol for the next iteration
          prevEnemyTol = r.enemyTol;

          // Calculate which part of the texture to draw based on the normalized hit point
          const textureX = Math.floor(normalizedHitPoint * enemyTexture.width);

          // Ensure textureX is within the bounds of the texture's width
          if (textureX < 0 || textureX >= enemyTexture.width) {
            console.error("textureX out of bounds:", textureX);
            return; // Skip drawing if we have incorrect values.
          }

          // Draw the slice of the enemy with the texture
          ctx.drawImage(
            enemyTexture, // Enemy image source
            textureX, // X position on the texture
            0, // Y position on the texture
            1, // Width of the slice on the texture (1 pixel for no stretching)
            enemyTexture.height, // Height of the texture
            i * (canvas.width / NUM_RAYS), // X position on the canvas
            enemyOffset, // Y position on the canvas
            canvas.width / NUM_RAYS, // Width of the slice on the canvas
            enemyHeight // Height of the slice on the canvas
          );
        }
      } else {
        // Calculate the lineHeight based on the distance
        const lineHeight = WALL_HEIGHT / r.distance;

        // Calculate the offset for the lineHeight
        const offset = (canvas.height - lineHeight) / 2;

        // Here, we calculate 'textureX' based on the wall segment hit by the ray.
        // Since 'mapX' and 'mapY' represent coordinates in the map grid, we use them
        // to calculate a consistent position in the texture for the same wall segment.
        // This example assumes a single texture used for all walls, tiled across the map.
        const wall = map[r.mapY][r.mapX]; // Get the wall type or info if available (not used here, but might be relevant for different wall textures)
        const hitPoint = (r.wasHitVertical ? r.hitX : r.hitY) % 1; // Assuming hitX and hitY are the exact coordinates where the ray hit
        const textureX = Math.floor(hitPoint * walltexture.current.width);
        if (textureX < 0 || textureX >= walltexture.current.width) {
          console.error("textureX out of bounds:", textureX);
          return; // Skip drawing if we have incorrect values.
        }
        const scaledTextureX = Math.floor(
          ((hitPoint * 5) / 5) * walltexture.current.width
        ); // This scales the hit point from wall units to texture pixels.

        // Calculate alpha based on distance
        const maxDistance = FOG_DISTANCE; // Set this to whatever your maximum render distance is
        let alpha = 1.0 - r.distance / maxDistance;
        alpha = Math.max(alpha, 0.3); // Prevent it from becoming completely transparent

        // Draw the slice of the wall with the texture
        ctx.globalAlpha = alpha; // Apply the alpha for this wall slice
        ctx.drawImage(
          walltexture.current, // Image source
          scaledTextureX, // x position on the texture
          0, // y position on the texture
          1, // width of the slice on the texture (1 pixel to avoid stretching)
          walltexture.current.height, // height of the slice on the texture (full height)
          i * (canvas.width / NUM_RAYS), // x position on the canvas
          offset, // y position on the canvas
          canvas.width / NUM_RAYS, // width of the slice on the canvas
          lineHeight // height of the slice on the canvas
        );
        ctx.globalAlpha = 1.0; // Reset alpha after drawing the slice
      }
    });

    if (gunImage.current) {
      // Check if the image has loaded
      const scale = 6; // Scaling factor

      // Calculate the new dimensions
      const scaledWidth = gunImage.current.width * scale;
      const scaledHeight = gunImage.current.height * scale;

      // Calculate the position to center the image
      const gunX = (canvas.width - scaledWidth) / 2; // Center the image horizontally
      const gunY = canvas.height - scaledHeight - bobbingEffect.current; // Apply bobbing effect

      const currentGunImage = isShootingRef.current
        ? shootGifImage.current[currentShootFrame.current + ""] // Use the current frame
        : gunImage.current;

      // Draw the image with the new dimensions and position
      ctx.drawImage(currentGunImage, gunX, gunY, scaledWidth, scaledHeight);
    }
  };

  const drawMiniMap = () => {
    if (playerPosition.current.alive === false) return;
    const miniMap = miniMapRef.current;
    const ctx = miniMap.getContext("2d");

    // Clear the previous content
    ctx.clearRect(0, 0, miniMap.width, miniMap.height);

    // Assuming the map is an array of arrays (grid), and each cell represents a TILE_SIZE x TILE_SIZE area
    const mapHeight = map.length;
    const mapWidth = map[0].length; // assuming a rectangular map

    // Calculate the scale between the map units and the canvas pixels
    const scaleX = miniMap.width / (mapWidth * TILE_LENGTH);
    const scaleY = miniMap.height / (mapHeight * TILE_LENGTH);

    // Draw each wall in the map as a rectangle on the minimap
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        if (map[y][x] === 1) {
          // 1 represents a wall in this context
          ctx.fillStyle = "black"; // Wall color

          // Here we modify the x-coordinate for drawing, effectively flipping the x-axis
          ctx.fillRect(
            (mapWidth - 1 - x) * TILE_LENGTH * scaleX, // This line changes
            y * TILE_LENGTH * scaleY,
            TILE_LENGTH * scaleX,
            TILE_LENGTH * scaleY
          );
        }
      }
    }

    // Calculate the player's position on the minimap
    // The x-coordinate needs to be flipped for the player's position as well
    const playerMiniMapX =
      (mapWidth * TILE_LENGTH - playerPosition.current.x) * scaleX; // This line changes
    const playerMiniMapY = playerPosition.current.y * scaleY;

    // Draw the player on the minimap
    ctx.fillStyle = "blue";
    ctx.fillRect(playerMiniMapX - 5, playerMiniMapY - 5, 10, 10); // Player is a small square

    // Draw a line indicating the player's direction
    const testrayAngle = playerPosition.current.angle;

    const ray = castSingleRay2(testrayAngle);
    let lineLength;
    if (ray.wallSide === "x") {
      lineLength = ray.distance * scaleX;
    } else {
      lineLength = ray.distance * scaleY;
    }
    // console.log(ray.distance);
    // let lineLength = 20;

    const lineEndX =
      playerMiniMapX - Math.cos(playerPosition.current.angle) * lineLength; // This line changes (inverted cos)
    const lineEndY =
      playerMiniMapY + Math.sin(playerPosition.current.angle) * lineLength;

    ctx.beginPath();
    ctx.moveTo(playerMiniMapX, playerMiniMapY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = "orange"; // Line color
    ctx.stroke();

    enemies.current.forEach((enemy) => {
      // Calculate the enemy's position on the minimap
      // The x-coordinate needs to be flipped for the enemy's position as well
      const enemyMiniMapX = (mapWidth * TILE_LENGTH - enemy.x) * scaleX; // This line changes
      const enemyMiniMapY = enemy.y * scaleY;

      // Draw the enemy on the minimap as a small circle
      ctx.fillStyle = "red"; // Enemy color
      ctx.beginPath();
      ctx.arc(enemyMiniMapX, enemyMiniMapY - 2, 5, 0, 2 * Math.PI); // Enemy is a small circle
      ctx.fill();
    });
  };

  const normalizeAngle = (angle) => {
    // 'angle' is in radians
    const TWO_PI = 2 * Math.PI;
    // This operation normalizes the angle between -2π and 2π
    angle %= TWO_PI;
    // If the angle is negative, make it positive by adding 2π
    if (angle < 0) {
      angle += TWO_PI;
    }
    return angle;
  };

  const updateEnemy = (enemy) => {
    let playerX = playerPosition.current.x;
    let playerY = playerPosition.current.y;
    let enemyX = enemy.x;
    let enemyY = enemy.y;

    // Calculate the vector pointing from the enemy to the player
    let toPlayerX = playerX - enemyX;
    let toPlayerY = playerY - enemyY;

    // Calculate the distance from the enemy to the player
    let distanceToPlayer = Math.sqrt(
      toPlayerX * toPlayerX + toPlayerY * toPlayerY
    );

    // Normalize the vector
    let normalizedToPlayerX = toPlayerX / distanceToPlayer;
    let normalizedToPlayerY = toPlayerY / distanceToPlayer;

    const moveSpeed = 0.06 * 2; // This is the speed at which the enemy will move towards the player

    // Calculate the next potential positions for the enemy
    let nextX = enemy.x + normalizedToPlayerX * moveSpeed;
    let nextY = enemy.y + normalizedToPlayerY * moveSpeed;

    // Calculate the map grid position
    const nextMapX = Math.floor(nextX / TILE_LENGTH);
    const nextMapY = Math.floor(nextY / TILE_LENGTH);

    // Check if the next position is inside a wall
    if (map[nextMapY] && map[nextMapY][nextMapX] === 1) {
      // Collision detected, try to move along the wall
      // Check the perpendicular directions to the movement vector
      let wallFollowX = -normalizedToPlayerY; // Perpendicular vector component x
      let wallFollowY = normalizedToPlayerX; // Perpendicular vector component y

      // Check which side (left or right) is free for the enemy to move along the wall
      if (
        map[Math.floor(enemy.y / TILE_LENGTH)][
          Math.floor((enemy.x + wallFollowX * moveSpeed) / TILE_LENGTH)
        ] !== 1
      ) {
        // The left side is free, move to the left along the wall
        nextX = enemy.x + wallFollowX * moveSpeed;
        nextY = enemy.y + wallFollowY * moveSpeed;
      } else if (
        map[Math.floor(enemy.y / TILE_LENGTH)][
          Math.floor((enemy.x - wallFollowX * moveSpeed) / TILE_LENGTH)
        ] !== 1
      ) {
        // The right side is free, move to the right along the wall
        nextX = enemy.x - wallFollowX * moveSpeed;
        nextY = enemy.y - wallFollowY * moveSpeed;
      } else {
        // No free side found, the enemy is stuck in a corner or surrounded
        return;
      }
    }

    // Update enemy's position if no collision
    enemy.x = nextX;
    enemy.y = nextY;
  };

  const updatePlayer = () => {
    const moveSpeed = 0.07 * 2; // The speed at which the player moves
    const strafeSpeed = 0.04 * 2; // The speed at which the player strafes (move sideways)

    // Calculate the player's next position
    let nextX = playerPosition.current.x;
    let nextY = playerPosition.current.y;

    if (movement.current.forward) {
      nextX += moveSpeed * Math.cos(playerPosition.current.angle);
      nextY += moveSpeed * Math.sin(playerPosition.current.angle);
    }
    if (movement.current.backward) {
      nextX -= moveSpeed * Math.cos(playerPosition.current.angle);
      nextY -= moveSpeed * Math.sin(playerPosition.current.angle);
    }
    if (movement.current.strafeLeft) {
      nextX -= strafeSpeed * Math.sin(playerPosition.current.angle);
      nextY += strafeSpeed * Math.cos(playerPosition.current.angle);
    }
    if (movement.current.strafeRight) {
      nextX += strafeSpeed * Math.sin(playerPosition.current.angle);
      nextY -= strafeSpeed * Math.cos(playerPosition.current.angle);
    }

    // Convert player's next position to map grid coordinates
    const nextMapX = Math.floor(nextX / TILE_LENGTH);
    const nextMapY = Math.floor(nextY / TILE_LENGTH);

    // Check if the next position is inside a wall
    if (map[nextMapY] && map[nextMapY][nextMapX] === 1) {
      // Collision detected, don't update player's position
      return;
    }

    // Update player's position if no collision
    playerPosition.current.x = nextX;
    playerPosition.current.y = nextY;

    // Ensure the angle remains within the range [0, 2π]
    if (playerPosition.current.angle > Math.PI * 2) {
      playerPosition.current.angle -= Math.PI * 2;
    } else if (playerPosition.current.angle < 0) {
      playerPosition.current.angle += Math.PI * 2;
    }

    playerPosition.current.angle = normalizeAngle(playerPosition.current.angle);

    const wasMoving = isMoving;
    const moving =
      movement.current.forward ||
      movement.current.backward ||
      movement.current.strafeLeft ||
      movement.current.strafeRight;

    // Update the isMoving state if necessary
    if (wasMoving !== moving) {
      setIsMoving(moving);
    }

    // Adjust the bobbing effect based on whether the player is moving
    if (moving) {
      bobbingEffect.current = Math.sin(Date.now() / 100) * 10; // This creates a bobbing effect over time
    } else {
      bobbingEffect.current = 0; // Reset the bobbing effect when the player is not moving
    }
    // Here, you could add more game logic...
  };

  const isShootingRef = useRef(false);

  const handleShoot = useCallback(() => {
    if (shootingTimeoutRef.current) return; // If already shooting, ignore this request

    setIsShooting(true); // Set the shooting flag to true
    isShootingRef.current = true; // Reflects immediately

    for (let i = -NUM_RAYS / 100; i < NUM_RAYS / 100; i++) {
      const rayAngle = playerPosition.current.angle - (FOV / NUM_RAYS) * i;

      castSingleRay2(rayAngle, true);
    }

    // Set the duration of the GIF (should match your actual GIF duration)
    const shootDuration = 1000; // e.g., 1000 for 1 second

    // Set a timeout to switch back to the gun image after the GIF plays
    shootingTimeoutRef.current = setTimeout(() => {
      setIsShooting(false); // Set the shooting flag to false
      isShootingRef.current = false; // Reflects immediately

      shootingTimeoutRef.current = null; // Clear the ref
    }, shootDuration);
  }, []); // Removed isShooting from dependencies

  useEffect(() => {
    // if (firstRun.current) {
    //   firstRun.current = false;
    //   return;
    // }

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
          movement.current.forward = true;
          break;
        case "s":
          movement.current.backward = true;
          break;
        case "a":
          // Move left without changing angle
          movement.current.strafeLeft = true;
          break;
        case "d":
          // Move right without changing angle
          movement.current.strafeRight = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "w":
          movement.current.forward = false;
          break;
        case "s":
          movement.current.backward = false;
          break;
        case "a":
          movement.current.strafeLeft = false;
          break;
        case "d":
          movement.current.strafeRight = false;
          break;
        default:
          break;
      }
    };

    const canvas = canvasRef.current;
    if (!canvas)
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const miniMap = miniMapRef.current;
    if (!miniMap)
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    miniMap.width = 200;
    miniMap.height = 200;
    miniMap.style.border = "1px solid black";

    // New function to handle mouse movement
    const handleMouseMove = (event) => {
      // Calculate the change in mouse position. You might need to adjust sensitivity.
      const sensitivity = 0.0008;
      playerPosition.current.angle -= event.movementX * sensitivity;
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === canvas) {
        // Pointer was just locked
        // Add the mousemove listener
        document.addEventListener("mousemove", handleMouseMove);
      } else {
        // Pointer was just unlocked
        // Remove the mousemove listener
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    const handleMouseDown = () => {
      handleShoot();
    };

    if (playerAlive === false)
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener(
          "pointerlockchange",
          handlePointerLockChange,
          false
        );
        canvas.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
      };

    window.addEventListener("mousedown", handleMouseDown);

    // Event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Lock the pointer to the canvas when clicked
    canvas.addEventListener("click", () => {
      canvas.requestPointerLock =
        canvas.requestPointerLock || canvas.mozRequestPointerLock;
      canvas.requestPointerLock();
      handleShoot(); // Add this line
    });

    const animate = () => {
      updatePlayer(); // Make sure this function now handles strafe movements
      enemies.current.forEach((enemy) => {
        if (enemy.alive) {
          updateEnemy(enemy);
        }
      });
      draw3DView();
      drawMiniMap();
      if (playerPosition.current.alive) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
        false
      );
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [playerAlive]);

  return (
    <>
      {playerAlive ? (
        <div>
          <canvas ref={canvasRef} />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <canvas ref={miniMapRef} />
            <div
              style={{
                marginTop: "10px",
                fontSize: "24px",
                color: "white",
              }}
            >
              Score: {score}
            </div>
          </div>
        </div>
      ) : (
        <DeathScreen onRespawn={handleRespawn} score={score} />
      )}
    </>
  );
}

export default Doom;

function DeathScreen({ onRespawn, score }) {
  // References to the canvas and image elements
  const deathScreenRef = useRef(null);
  const deathTexture = useRef(null);

  useEffect(() => {
    const canvas = deathScreenRef.current;
    const ctx = canvas.getContext("2d");

    // Adjust canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load the image
    const image = new Image();
    image.src = "died.jpg";
    image.onload = () => {
      // Draw the image to the canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      deathTexture.current = image;
    };

    // Ensure the image is not repeated
    image.style.objectFit = "cover";
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <canvas ref={deathScreenRef} style={{ width: "100%", height: "100%" }} />
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px 20px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={onRespawn}
      >
        Respawn
      </button>
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px 20px",
          fontSize: "20px",
          cursor: "pointer",
          color: "white",
        }}
      >
        Score: {score}
      </div>
    </div>
  );
}
