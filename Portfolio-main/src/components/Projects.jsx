import { useEffect, useState } from "react";

import "./Projects.css";

import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import leetmatricImage from "../assets/images/leetmatric.png";
import portfolioImage from "../assets/images/portfolio.png";
import authifyImage from "../assets/images/authify.png";

const getProjectImage = (image) => {

  if (image === "/images/leetmatric.png") {
    return leetmatricImage;
  }

  if (image === "/images/portfolio.png") {
    return portfolioImage;
  }

  if (image === "/images/authify.png") {
    return authifyImage;
  }

  // New uploaded images
  return `${API_URL}${image}`;
};

// ========================================
// API URL
// ========================================

const API_URL = import.meta.env.VITE_API_URL;


// ========================================
// PROJECTS COMPONENT
// ========================================

function Projects() {

  // Store projects received from backend
  const [projects, setProjects] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");


  // ========================================
  // LOAD PROJECTS FROM BACKEND
  // ========================================

  useEffect(() => {

    const loadProjects = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/projects`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch projects"
          );
        }

        const data = await response.json();

        setProjects(data);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };


    loadProjects();

  }, []);


  // ========================================
  // UI
  // ========================================

  return (

    <section
      className="projects"
      id="projects"
    >

      <div className="projects-container">

        <h2>
          Projects
        </h2>


        <p className="projects-subtitle">
          Some of the projects I'm working on and building.
        </p>


        {/* ================================== */}
        {/* LOADING */}
        {/* ================================== */}

        {loading && (

          <p>
            Loading projects...
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
        {/* PROJECT GRID */}
        {/* ================================== */}

        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="projects-grid">

              {projects.map((project) => (

                <div
                  className="project-card"
                  key={project.id}
                >

                  {/* ======================== */}
                  {/* PROJECT IMAGE */}
                  {/* ======================== */}

                  <div className="project-image">

                    <img
  src={getProjectImage(project.image)}
  alt={project.name}
/>

                  </div>


                  {/* ======================== */}
                  {/* PROJECT CONTENT */}
                  {/* ======================== */}

                  <div className="project-content">

                    <h3>
                      {project.name}
                    </h3>


                    <p>
                      {project.description}
                    </p>


                    {/* ==================== */}
                    {/* TECH STACK */}
                    {/* ==================== */}

                    <div className="tech-stack">

                      {project.techStack.map(
                        (tech) => (

                          <span key={tech}>
                            {tech}
                          </span>

                        )
                      )}

                    </div>


                    {/* ==================== */}
                    {/* STATUS */}
                    {/* ==================== */}

                    <div className="project-status">

                      {project.status}

                    </div>


                    {/* ==================== */}
                    {/* BUTTONS */}
                    {/* ==================== */}

                    <div className="project-buttons">

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-btn"
                      >

                        <FaGithub />

                        GitHub

                      </a>


                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="demo-btn"
                      >

                        <FiExternalLink />

                        Live Demo

                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}


        {/* ================================== */}
        {/* NO PROJECTS */}
        {/* ================================== */}

        {!loading &&
          !error &&
          projects.length === 0 && (

            <p>
              No projects available.
            </p>

          )}

      </div>

    </section>
  );
}


// ========================================
// EXPORT
// ========================================

export default Projects;