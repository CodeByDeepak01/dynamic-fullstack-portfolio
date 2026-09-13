import "./Hero.css";

import profileImage from "../assets/images/profile_pic.png";

import { useEffect, useState } from "react";
import { getHero } from "../api/heroApi";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { TypeAnimation } from "react-type-animation";

function Hero() {

  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHero()
      .then((data) => {
        setHero(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load hero section.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!hero) {
    return <p>Loading...</p>;
  }

  return (
    <section className="hero" id="hero">

      <div className="hero-content">

        <div className="hero-badge">
          Available for Internships
        </div>

        <p className="greeting">Hello, I'm</p>

        <h1 className="hero-name">
          {hero.name}
        </h1>

        <TypeAnimation
          sequence={[
            "Java Full Stack Developer",
            2000,
            "Spring Boot Developer",
            2000,
            "Backend Developer",
            2000,
            "Problem Solver",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
        />

        <p>
          {hero.intro}
        </p>

        <div className="hero-buttons">

          <button
            onClick={() => {
              document.getElementById("projects").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View Projects
          </button>

          <button
            onClick={() => window.open(hero.resumeUrl, "_blank")}
          >
            Download Resume
          </button>

        </div>

        <div className="hero-socials">

          <a
            href={hero.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href={hero.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href={hero.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode />
          </a>

        </div>

      </div>

      <div className="hero-image">
        <img src={profileImage} alt={hero.name} />
      </div>

    </section>
  );
}

export default Hero;