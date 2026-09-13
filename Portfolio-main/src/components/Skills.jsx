import { useEffect, useState } from "react";

import "./Skills.css";

import { FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

import {
  SiSpringboot,
  SiMysql,
  SiJavascript,
  SiC,
} from "react-icons/si";

import { BsCodeSlash } from "react-icons/bs";
import { TbApi } from "react-icons/tb";


// ========================================
// API URL
// ========================================

const API_URL = import.meta.env.VITE_API_URL;


// ========================================
// ICON MAPPING
// Backend icon key → React Icon
// ========================================

const iconMap = {
  java: <FaJava />,

  "problem-solving": <BsCodeSlash />,

  springboot: <SiSpringboot />,

  mysql: <SiMysql />,

  api: <TbApi />,

  html: <FaHtml5 />,

  css: <FaCss3Alt />,

  javascript: <SiJavascript />,

  react: <FaReact />,

  git: <FaGitAlt />,

  c: <SiC />,

  python: <FaPython />,
};


// ========================================
// SKILLS COMPONENT
// ========================================

function Skills() {

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ========================================
  // GET SKILLS FROM BACKEND
  // ========================================

  useEffect(() => {

    const loadSkills = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/skills`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch skills"
          );
        }

        const data = await response.json();

        setSkills(data);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };


    loadSkills();

  }, []);


  // ========================================
  // UI
  // ========================================

  return (

    <section
      className="skills"
      id="skills"
    >

      <div className="skills-container">

        <h2>
          Skills
        </h2>

        <p className="skills-subtitle">
          Technologies and tools I work with.
        </p>


        {/* ================================== */}
        {/* LOADING */}
        {/* ================================== */}

        {loading && (

          <p>
            Loading skills...
          </p>

        )}


        {/* ================================== */}
        {/* ERROR */}
        {/* ================================== */}

        {error && (

          <p>
            {error}
          </p>

        )}


        {/* ================================== */}
        {/* SKILLS GRID */}
        {/* ================================== */}

        {!loading &&
          !error &&
          skills.length > 0 && (

            <div className="skills-grid">

              {skills.map((skill) => (

                <div
                  className="skill-card"
                  key={skill.id}
                >

                  {/* ======================== */}
                  {/* ICON */}
                  {/* ======================== */}

                  <div className="skill-icon">
  {iconMap[skill.icon] || <BsCodeSlash />}
</div>


                  {/* ======================== */}
                  {/* SKILL NAME */}
                  {/* ======================== */}

                  <h3>
                    {skill.name}
                  </h3>


                  {/* ======================== */}
                  {/* SKILL LEVEL */}
                  {/* ======================== */}

                  <span className="skill-level">

                    {skill.level}

                  </span>


                  {/* ======================== */}
                  {/* DESCRIPTION */}
                  {/* ======================== */}

                  <p>
                    {skill.description}
                  </p>

                </div>

              ))}

            </div>

          )}


        {/* ================================== */}
        {/* NO SKILLS */}
        {/* ================================== */}

        {!loading &&
          !error &&
          skills.length === 0 && (

            <p>
              No skills available.
            </p>

          )}

      </div>

    </section>
  );
}


// ========================================
// EXPORT
// ========================================

export default Skills;