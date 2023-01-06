import React from "react";
import "./HeroSection.css";
import Typewriter from "typewriter-effect";

function HeroSection() {
  return (
    <div className="hero-container">
      <section className="header-title">
        <p className="header-title-heading">Preparing for tech interviews?</p>
        <Typewriter
          className="header-type"
          options={{
            autoStart: true,
            loop: true,
            delay: 100,
            strings: [
              "Read DSA problems.",
              "Write your code.",
              "Visualize your code.",
            ],
          }}
        />
        <div className="hero-btn">
          <button
            onClick={() => {
              document
                .getElementsByClassName("cards__wrapper")[0]
                .scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                });
            }}
            className="start-button"
          >
            GET STARTED
          </button>
        </div>
      </section>
      <div>
        <div className="coder-image">
          {" "}
          <img src="images/front.png" alt="Coder" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
