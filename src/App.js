import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import logo from "./795169067773984779.gif";
import "./App.css";
import About from "./About";
import { useState, useEffect } from "react";
import Doom from "./doom/Doom";
import Mult from "./multiplayer/Mult";
import SampleSocket from "./multiplayer/SampleSocket";

const EmojiCursor = () => {
  useEffect(() => {
    function emojiCursor() {
      var possibleEmoji = ["😀", "😂", "😆", "😊"];
      var width = window.innerWidth;
      var height = window.innerHeight;
      var particles = [];

      function init() {
        bindEvents();
        loop();
      }

      function bindEvents() {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchstart", onTouchMove);
        window.addEventListener("resize", onWindowResize);
      }

      function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
      }

      function onTouchMove(e) {
        if (e.touches.length > 0) {
          for (var i = 0; i < e.touches.length; i++) {
            addParticle(
              e.touches[i].clientX,
              e.touches[i].clientY,
              possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
            );
          }
        }
      }

      function onMouseMove(e) {
        addParticle(
          e.clientX,
          e.clientY,
          possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
        );
      }

      function addParticle(x, y, character) {
        var particle = new Particle();
        particle.init(x, y, character);
        particles.push(particle);
      }

      function updateParticles() {
        for (var i = 0; i < particles.length; i++) {
          particles[i].update();
        }

        for (var i = particles.length - 1; i >= 0; i--) {
          if (particles[i].lifeSpan < 0) {
            particles[i].die();
            particles.splice(i, 1);
          }
        }
      }

      function loop() {
        requestAnimationFrame(loop);
        updateParticles();
      }

      function Particle() {
        this.character = "";
        this.lifeSpan = 120; //ms
        this.initialStyles = {
          position: "absolute",
          display: "block",
          pointerEvents: "none",
          "z-index": "10000000",
          fontSize: "16px",
          "will-change": "transform",
        };

        this.init = function (x, y, character) {
          this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1,
          };

          this.position = { x: x - 10, y: y - 20 };
          this.character = character;

          this.element = document.createElement("span");
          this.element.innerHTML = character;
          applyProperties(this.element, this.initialStyles);
          this.update();

          document.body.appendChild(this.element);
        };

        this.update = function () {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;

          this.element.style.transform =
            "translate3d(" +
            this.position.x +
            "px," +
            this.position.y +
            "px,0) scale(" +
            this.lifeSpan / 120 +
            ")";
        };

        this.die = function () {
          this.element.parentNode.removeChild(this.element);
        };
      }

      function applyProperties(target, properties) {
        for (var key in properties) {
          target.style[key] = properties[key];
        }
      }

      init(); // This initializes the emojiCursor functionality
    }

    emojiCursor(); // This calls the function when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return null; // This component doesn't render anything
};

function App() {
  return (
    <Router>
      {/* <EmojiCursor /> */}
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={<About />} />
        <Route path="/doom" element={<Doom />} />
        <Route path="/multiplayer" element={<Mult />} />
      </Routes>
    </Router>
  );
}

function Home() {
  // const [cursor, setCursor] = useState(cursorImage1); // Sta

  return (
    <div className="App">
      <header className="App-header">
        <h1>Im on a whole nother level im geeking!</h1>
        <p>
          You think you fuckin' with me? Boy, you tweakin' Ready for war, I just
          need me a reason I'm gettin' buckets in regular season
        </p>
        <Link to="/about">clcik about me</Link>
        <Link to="/doom">clcik me for doom singleplayer game</Link>
        <Link to="/multiplayer">clcik me for doom multiplayer game</Link>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
