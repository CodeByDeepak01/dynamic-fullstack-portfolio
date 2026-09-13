import { useEffect, useState } from "react";
import "./About.css";
import { getAbout } from "../api/aboutApi";

function About() {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAbout()
      .then((data) => {
        setAbout(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load About section.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!about) {
    return <p>Loading...</p>;
  }

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-left">
          <h2>About Me</h2>

          <p>{about.paragraph1}</p>

          <p>{about.paragraph2}</p>

          <p>{about.paragraph3}</p>
        </div>
      </div>
    </section>
  );
}

export default About;