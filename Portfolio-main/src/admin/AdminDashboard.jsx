// ========================================
// IMPORTS
// ========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// ========================================
// PROJECT API
// ========================================

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  createProjectWithImage,
  updateProjectWithImage,
} from "../api/projectsApi";


// ========================================
// SKILL API
// ========================================

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../api/skillsApi";


// ========================================
// HERO API
// ========================================

import {
  getHero,
  updateHero,
} from "../api/heroApi";


// ========================================
// ABOUT API
// ========================================

import {
  getAbout,
  updateAbout,
} from "../api/aboutApi";


// ========================================
// CONTACT API
// ========================================

import {
  getContact,
  updateContact,
} from "../api/contactApi";


// ========================================
// CSS
// ========================================

import "./AdminDashboard.css";


// ========================================
// ADMIN DASHBOARD COMPONENT
// ========================================

function AdminDashboard() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("adminUsername");


  // ========================================
  // ACTIVE SIDEBAR SECTION
  // ========================================

  const [activeSection, setActiveSection] =
    useState("dashboard");


  // ========================================
  // COMMON ERROR STATE
  // ========================================

  const [error, setError] = useState("");


  // ========================================
  // PROJECT STATE
  // ========================================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);


  // Project form data

  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: "",
    status: "",
    image: "",
    githubUrl: "",
    demoUrl: "",
  });


  // Selected image file

  const [selectedImage, setSelectedImage] =
    useState(null);


  // ========================================
  // SKILL STATE
  // ========================================

  const [skills, setSkills] = useState([]);

  const [skillsLoading, setSkillsLoading] =
    useState(true);

  const [skillEditingId, setSkillEditingId] =
    useState(null);


  const [skillForm, setSkillForm] = useState({
    name: "",
    level: "",
    description: "",
    icon: "",
  });


  // ========================================
  // HERO STATE
  // ========================================

  const [hero, setHero] = useState(null);

  const [heroLoading, setHeroLoading] =
    useState(true);


  const [heroForm, setHeroForm] = useState({
    name: "",
    intro: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    leetcodeUrl: "",
  });


  // ========================================
  // ABOUT STATE
  // ========================================

  const [about, setAbout] = useState(null);

  const [aboutLoading, setAboutLoading] =
    useState(true);


  const [aboutForm, setAboutForm] = useState({
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });


  // ========================================
  // CONTACT STATE
  // ========================================

  const [contact, setContact] =
    useState(null);

  const [contactLoading, setContactLoading] =
    useState(true);


  const [contactForm, setContactForm] = useState({
    email: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    leetcodeUrl: "",
  });


  // ========================================
  // LOAD PROJECTS
  // ========================================

  const loadProjects = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // LOAD SKILLS
  // ========================================

  const loadSkills = async () => {

    try {

      setSkillsLoading(true);
      setError("");

      const data = await getSkills();

      setSkills(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setSkillsLoading(false);

    }
  };


  // ========================================
  // LOAD HERO
  // ========================================

  const loadHero = async () => {

    try {

      setHeroLoading(true);
      setError("");

      const data = await getHero();

      setHero(data);

      setHeroForm({
        name: data.name,
        intro: data.intro,
        resumeUrl: data.resumeUrl,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        leetcodeUrl: data.leetcodeUrl,
      });

    } catch (error) {

      setError(error.message);

    } finally {

      setHeroLoading(false);

    }
  };


  // ========================================
  // LOAD ABOUT
  // ========================================

  const loadAbout = async () => {

    try {

      setAboutLoading(true);
      setError("");

      const data = await getAbout();

      setAbout(data);

      setAboutForm({
        paragraph1: data.paragraph1,
        paragraph2: data.paragraph2,
        paragraph3: data.paragraph3,
      });

    } catch (error) {

      setError(error.message);

    } finally {

      setAboutLoading(false);

    }
  };


  // ========================================
  // LOAD CONTACT
  // ========================================

  const loadContact = async () => {

    try {

      setContactLoading(true);
      setError("");

      const data = await getContact();

      setContact(data);

      setContactForm({
        email: data.email,
        location: data.location,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        leetcodeUrl: data.leetcodeUrl,
      });

    } catch (error) {

      setError(error.message);

    } finally {

      setContactLoading(false);

    }
  };


  // ========================================
  // LOAD ALL ADMIN DATA
  // ========================================

  useEffect(() => {

    loadProjects();
    loadSkills();
    loadHero();
    loadAbout();
    loadContact();

  }, []);


  // ========================================
  // PROJECT FORM INPUT
  // ========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };


  // ========================================
  // PROJECT IMAGE SELECTION
  // ========================================

  const handleImageChange = (e) => {

    const file = e.target.files[0];


    // No file selected

    if (!file) {

      setSelectedImage(null);

      return;
    }


    // Allowed image types

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];


    // Validate image type

    if (!allowedTypes.includes(file.type)) {

      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      e.target.value = "";

      setSelectedImage(null);

      return;
    }


    // Validate image size

    if (file.size > 5 * 1024 * 1024) {

      setError(
        "Image size must not exceed 5MB."
      );

      e.target.value = "";

      setSelectedImage(null);

      return;
    }


    // Valid image

    setError("");

    setSelectedImage(file);
  };


  // ========================================
  // SKILL FORM INPUT
  // ========================================

  const handleSkillChange = (e) => {

    const { name, value } = e.target;

    setSkillForm({
      ...skillForm,
      [name]: value,
    });
  };


  // ========================================
  // HERO FORM INPUT
  // ========================================

  const handleHeroChange = (e) => {

    const { name, value } = e.target;

    setHeroForm({
      ...heroForm,
      [name]: value,
    });
  };


  // ========================================
  // ABOUT FORM INPUT
  // ========================================

  const handleAboutChange = (e) => {

    const { name, value } = e.target;

    setAboutForm({
      ...aboutForm,
      [name]: value,
    });
  };


  // ========================================
  // CONTACT FORM INPUT
  // ========================================

  const handleContactChange = (e) => {

    const { name, value } = e.target;

    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };


  // ========================================
  // CREATE / UPDATE PROJECT
  // ========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");


      // Convert comma-separated tech stack
      // into an array

      const projectData = {

        name: form.name,

        description: form.description,

        techStack: form.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),

        status: form.status,

        githubUrl: form.githubUrl,

        demoUrl: form.demoUrl,
      };


      // ====================================
      // UPDATE EXISTING PROJECT
      // ====================================

      if (editingId) {

        const updatedProject =
          await updateProjectWithImage(
            editingId,
            projectData,
            selectedImage
          );


        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === editingId
              ? updatedProject
              : project
          )
        );


      // ====================================
      // CREATE NEW PROJECT
      // ====================================

      } else {

        // Image is required for new project

        if (!selectedImage) {

          setError(
            "Please select a project image."
          );

          return;
        }


        const newProject =
          await createProjectWithImage(
            projectData,
            selectedImage
          );


        setProjects((currentProjects) => [
          ...currentProjects,
          newProject,
        ]);
      }


      // Clear form after success

      resetForm();

    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // CREATE / UPDATE SKILL
  // ========================================

  const handleSkillSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");


      const skillData = {

        name: skillForm.name,

        level: skillForm.level,

        description: skillForm.description,

        icon: skillForm.icon,
      };


      // Update

      if (skillEditingId) {

        const updatedSkill =
          await updateSkill(
            skillEditingId,
            skillData
          );


        setSkills((currentSkills) =>
          currentSkills.map((skill) =>
            skill.id === skillEditingId
              ? updatedSkill
              : skill
          )
        );


      // Create

      } else {

        const newSkill =
          await createSkill(skillData);


        setSkills((currentSkills) => [
          ...currentSkills,
          newSkill,
        ]);
      }


      resetSkillForm();

    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // UPDATE HERO
  // ========================================

  const handleHeroSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");


      const updatedHero =
        await updateHero(
          hero.id,
          heroForm
        );


      setHero(updatedHero);


      setHeroForm({

        name: updatedHero.name,

        intro: updatedHero.intro,

        resumeUrl: updatedHero.resumeUrl,

        githubUrl: updatedHero.githubUrl,

        linkedinUrl: updatedHero.linkedinUrl,

        leetcodeUrl: updatedHero.leetcodeUrl,
      });


      alert(
        "Hero updated successfully!"
      );

    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // UPDATE ABOUT
  // ========================================

  const handleAboutSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");


      const updatedAbout =
        await updateAbout(
          about.id,
          aboutForm
        );


      setAbout(updatedAbout);


      setAboutForm({

        paragraph1:
          updatedAbout.paragraph1,

        paragraph2:
          updatedAbout.paragraph2,

        paragraph3:
          updatedAbout.paragraph3,
      });


      alert(
        "About section updated successfully!"
      );

    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // UPDATE CONTACT
  // ========================================

  const handleContactSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");


      const updatedContact =
        await updateContact(
          contact.id,
          contactForm
        );


      setContact(updatedContact);


      setContactForm({

        email:
          updatedContact.email,

        location:
          updatedContact.location,

        githubUrl:
          updatedContact.githubUrl,

        linkedinUrl:
          updatedContact.linkedinUrl,

        leetcodeUrl:
          updatedContact.leetcodeUrl,
      });


      alert(
        "Contact information updated successfully!"
      );

    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // EDIT PROJECT
  // ========================================

  const handleEdit = (project) => {

    setEditingId(project.id);


    // Clear previously selected image

    setSelectedImage(null);


    setForm({

      name: project.name,

      description:
        project.description,

      techStack:
        project.techStack.join(", "),

      status:
        project.status,

      image:
        project.image,

      githubUrl:
        project.githubUrl,

      demoUrl:
        project.demoUrl,
    });


    // Automatically open Projects section

    setActiveSection("projects");
  };


  // ========================================
  // EDIT SKILL
  // ========================================

  const handleSkillEdit = (skill) => {

    setSkillEditingId(skill.id);


    setSkillForm({

      name: skill.name,

      level: skill.level,

      description:
        skill.description,

      icon: skill.icon,
    });


    // Automatically open Skills section

    setActiveSection("skills");
  };


  // ========================================
  // DELETE PROJECT
  // ========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");


      await deleteProject(id);


      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project.id !== id
        )
      );


    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // DELETE SKILL
  // ========================================

  const handleSkillDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this skill?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");


      await deleteSkill(id);


      setSkills((currentSkills) =>
        currentSkills.filter(
          (skill) => skill.id !== id
        )
      );


    } catch (error) {

      setError(error.message);

    }
  };


  // ========================================
  // RESET PROJECT FORM
  // ========================================

  const resetForm = () => {

    setEditingId(null);

    setSelectedImage(null);


    setForm({

      name: "",

      description: "",

      techStack: "",

      status: "",

      image: "",

      githubUrl: "",

      demoUrl: "",
    });
  };


  // ========================================
  // RESET SKILL FORM
  // ========================================

  const resetSkillForm = () => {

    setSkillEditingId(null);


    setSkillForm({

      name: "",

      level: "",

      description: "",

      icon: "",
    });
  };


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminUsername"
    );


    navigate("/admin/login");
  };


  // ========================================
  // DASHBOARD SECTION
  // ========================================

  const renderDashboard = () => {

    return (

      <div className="admin-section">

        <h2>Dashboard</h2>

        <p className="dashboard-subtitle">
          Manage and monitor your portfolio
          content.
        </p>


        {/* ============================== */}
        {/* LIVE STATS */}
        {/* ============================== */}

        <div className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon">
              📁
            </div>

            <div className="stat-info">

              <h3>
                {projects.length}
              </h3>

              <p>
                Total Projects
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🛠️
            </div>

            <div className="stat-info">

              <h3>
                {skills.length}
              </h3>

              <p>
                Total Skills
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              👤
            </div>

            <div className="stat-info">

              <h3>
                {hero ? 1 : 0}
              </h3>

              <p>
                Hero Section
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ℹ️
            </div>

            <div className="stat-info">

              <h3>
                {about ? 1 : 0}
              </h3>

              <p>
                About Section
              </p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✉️
            </div>

            <div className="stat-info">

              <h3>
                {contact ? 1 : 0}
              </h3>

              <p>
                Contact Section
              </p>

            </div>

          </div>

        </div>


        {/* ============================== */}
        {/* QUICK MANAGEMENT */}
        {/* ============================== */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <h3>
              Hero
            </h3>

            <p>
              Manage your introduction,
              resume and social links.
            </p>

            <button
              onClick={() =>
                setActiveSection("hero")
              }
            >
              Manage Hero
            </button>

          </div>


          <div className="dashboard-card">

            <h3>
              About
            </h3>

            <p>
              Update your About section.
            </p>

            <button
              onClick={() =>
                setActiveSection("about")
              }
            >
              Manage About
            </button>

          </div>


          <div className="dashboard-card">

            <h3>
              Skills
            </h3>

            <p>
              You currently have{" "}
              <strong>
                {skills.length}
              </strong>{" "}
              skills.
            </p>

            <button
              onClick={() =>
                setActiveSection("skills")
              }
            >
              Manage Skills
            </button>

          </div>


          <div className="dashboard-card">

            <h3>
              Projects
            </h3>

            <p>
              You currently have{" "}
              <strong>
                {projects.length}
              </strong>{" "}
              projects.
            </p>

            <button
              onClick={() =>
                setActiveSection("projects")
              }
            >
              Manage Projects
            </button>

          </div>


          <div className="dashboard-card">

            <h3>
              Contact
            </h3>

            <p>
              Manage your contact
              information.
            </p>

            <button
              onClick={() =>
                setActiveSection("contact")
              }
            >
              Manage Contact
            </button>

          </div>

        </div>

      </div>
    );
  };


  // ========================================
  // HERO SECTION
  // ========================================

  const renderHero = () => {

    return (

      <div className="admin-section">

        <h2>
          Manage Hero
        </h2>


        {heroLoading ? (

          <p>
            Loading hero...
          </p>

        ) : !hero ? (

          <p>
            Hero data not found.
          </p>

        ) : (

          <form
            className="single-section-form"
            onSubmit={handleHeroSubmit}
          >

            <input
              type="text"
              name="name"
              value={heroForm.name}
              onChange={handleHeroChange}
              placeholder="Name"
              required
            />


            <textarea
              name="intro"
              value={heroForm.intro}
              onChange={handleHeroChange}
              placeholder="Introduction"
              required
            />


            <input
              type="url"
              name="resumeUrl"
              value={heroForm.resumeUrl}
              onChange={handleHeroChange}
              placeholder="Resume URL"
              required
            />


            <input
              type="url"
              name="githubUrl"
              value={heroForm.githubUrl}
              onChange={handleHeroChange}
              placeholder="GitHub URL"
              required
            />


            <input
              type="url"
              name="linkedinUrl"
              value={heroForm.linkedinUrl}
              onChange={handleHeroChange}
              placeholder="LinkedIn URL"
              required
            />


            <input
              type="url"
              name="leetcodeUrl"
              value={heroForm.leetcodeUrl}
              onChange={handleHeroChange}
              placeholder="LeetCode URL"
              required
            />


            <button type="submit">
              Save Hero
            </button>

          </form>
        )}

      </div>
    );
  };


  // ========================================
  // ABOUT SECTION
  // ========================================

  const renderAbout = () => {

    return (

      <div className="admin-section">

        <h2>
          Manage About
        </h2>


        {aboutLoading ? (

          <p>
            Loading about...
          </p>

        ) : !about ? (

          <p>
            About data not found.
          </p>

        ) : (

          <form
            className="single-section-form"
            onSubmit={handleAboutSubmit}
          >

            <textarea
              name="paragraph1"
              value={aboutForm.paragraph1}
              onChange={handleAboutChange}
              placeholder="Paragraph 1"
              required
            />


            <textarea
              name="paragraph2"
              value={aboutForm.paragraph2}
              onChange={handleAboutChange}
              placeholder="Paragraph 2"
              required
            />


            <textarea
              name="paragraph3"
              value={aboutForm.paragraph3}
              onChange={handleAboutChange}
              placeholder="Paragraph 3"
              required
            />


            <button type="submit">
              Save About
            </button>

          </form>
        )}

      </div>
    );
  };


  // ========================================
  // SKILLS SECTION
  // ========================================

  const renderSkills = () => {

    return (

      <div className="admin-section">

        <h2>
          Manage Skills
        </h2>


        {/* ============================== */}
        {/* SKILL FORM */}
        {/* ============================== */}

        <div className="skill-form-card">

          <h3>
            {skillEditingId
              ? "Edit Skill"
              : "Add New Skill"}
          </h3>


          <form
            onSubmit={handleSkillSubmit}
          >

            <input
              type="text"
              name="name"
              value={skillForm.name}
              onChange={handleSkillChange}
              placeholder="Skill Name"
              required
            />


            <input
              type="text"
              name="level"
              value={skillForm.level}
              onChange={handleSkillChange}
              placeholder="Level (Proficient / Working Knowledge / Basic)"
              required
            />


            <textarea
              name="description"
              value={skillForm.description}
              onChange={handleSkillChange}
              placeholder="Skill Description"
              required
            />


            <input
              type="text"
              name="icon"
              value={skillForm.icon}
              onChange={handleSkillChange}
              placeholder="Icon key (java, react, html...)"
              required
            />


            <div className="form-buttons">

              <button type="submit">

                {skillEditingId
                  ? "Update Skill"
                  : "Add Skill"}

              </button>


              {skillEditingId && (

                <button
                  type="button"
                  onClick={resetSkillForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>


        {/* ============================== */}
        {/* SKILLS LIST */}
        {/* ============================== */}

        <div className="skills-admin-list">

          <h3>
            Existing Skills
          </h3>


          {skillsLoading ? (

            <p>
              Loading skills...
            </p>

          ) : skills.length === 0 ? (

            <p>
              No skills found.
            </p>

          ) : (

            skills.map((skill) => (

              <div
                className="admin-skill"
                key={skill.id}
              >

                <div>

                  <h4>
                    {skill.name}
                  </h4>

                  <p>
                    {skill.level}
                  </p>

                  <small>
                    {skill.description}
                  </small>

                  <span>
                    Icon: {skill.icon}
                  </span>

                </div>


                <div className="skill-actions">

                  <button
                    onClick={() =>
                      handleSkillEdit(skill)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleSkillDelete(
                        skill.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    );
  };


  // ========================================
  // PROJECTS SECTION
  // ========================================

  const renderProjects = () => {

    return (

      <div className="admin-section">

        <h2>
          Manage Projects
        </h2>


        {/* ============================== */}
        {/* PROJECT FORM */}
        {/* ============================== */}

        <div className="project-form-card">

          <h3>

            {editingId
              ? "Edit Project"
              : "Add New Project"}

          </h3>


          <form
            onSubmit={handleSubmit}
          >


            {/* ========================== */}
            {/* PROJECT NAME */}
            {/* ========================== */}

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Project Name"
              required
            />


            {/* ========================== */}
            {/* PROJECT DESCRIPTION */}
            {/* ========================== */}

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Project Description"
              required
            />


            {/* ========================== */}
            {/* TECH STACK */}
            {/* ========================== */}

            <input
              type="text"
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              placeholder="Tech Stack (Java, Spring Boot, React)"
              required
            />


            {/* ========================== */}
            {/* PROJECT STATUS */}
            {/* ========================== */}

            <input
              type="text"
              name="status"
              value={form.status}
              onChange={handleChange}
              placeholder="Status (Completed / In Progress)"
              required
            />


            {/* ========================== */}
            {/* PROJECT IMAGE */}
            {/* ========================== */}

            <div className="image-upload-field">

              <label>
                Project Image
              </label>


              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                required={!editingId}
              />


              {/* Show current image path
                  while editing */}

              {editingId &&
                form.image && (

                  <p>
                    Current image:{" "}
                    {form.image}
                  </p>

                )}


              {/* Show selected file */}

              {selectedImage && (

                <p>
                  Selected:{" "}
                  {selectedImage.name}
                </p>

              )}

            </div>


            {/* ========================== */}
            {/* GITHUB URL */}
            {/* ========================== */}

            <input
              type="url"
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              placeholder="GitHub URL"
              required
            />


            {/* ========================== */}
            {/* DEMO URL */}
            {/* ========================== */}

            <input
              type="url"
              name="demoUrl"
              value={form.demoUrl}
              onChange={handleChange}
              placeholder="Demo URL"
              required
            />


            {/* ========================== */}
            {/* FORM BUTTONS */}
            {/* ========================== */}

            <div className="form-buttons">

              <button type="submit">

                {editingId
                  ? "Update Project"
                  : "Add Project"}

              </button>


              {editingId && (

                <button
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>


        {/* ============================== */}
        {/* PROJECT LIST */}
        {/* ============================== */}

        <div className="projects-admin-list">

          <h3>
            Existing Projects
          </h3>


          {loading ? (

            <p>
              Loading projects...
            </p>

          ) : projects.length === 0 ? (

            <p>
              No projects found.
            </p>

          ) : (

            projects.map((project) => (

              <div
                className="admin-project"
                key={project.id}
              >

                <div>

                  <h4>
                    {project.name}
                  </h4>

                  <p>
                    {project.description}
                  </p>

                  <small>
                    {project.techStack.join(", ")}
                  </small>

                  <span>
                    {project.status}
                  </span>

                </div>


                <div className="project-actions">

                  <button
                    onClick={() =>
                      handleEdit(project)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        project.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    );
  };


  // ========================================
  // CONTACT SECTION
  // ========================================

  const renderContact = () => {

    return (

      <div className="admin-section">

        <h2>
          Manage Contact
        </h2>


        {contactLoading ? (

          <p>
            Loading contact...
          </p>

        ) : !contact ? (

          <p>
            Contact data not found.
          </p>

        ) : (

          <form
            className="single-section-form"
            onSubmit={handleContactSubmit}
          >

            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactChange}
              placeholder="Email"
              required
            />


            <input
              type="text"
              name="location"
              value={contactForm.location}
              onChange={handleContactChange}
              placeholder="Location"
              required
            />


            <input
              type="url"
              name="githubUrl"
              value={contactForm.githubUrl}
              onChange={handleContactChange}
              placeholder="GitHub URL"
              required
            />


            <input
              type="url"
              name="linkedinUrl"
              value={contactForm.linkedinUrl}
              onChange={handleContactChange}
              placeholder="LinkedIn URL"
              required
            />


            <input
              type="url"
              name="leetcodeUrl"
              value={contactForm.leetcodeUrl}
              onChange={handleContactChange}
              placeholder="LeetCode URL"
              required
            />


            <button type="submit">
              Save Contact
            </button>

          </form>
        )}

      </div>
    );
  };


  // ========================================
  // ACTIVE SECTION ROUTER
  // ========================================

  const renderActiveSection = () => {

    switch (activeSection) {

      case "hero":
        return renderHero();

      case "about":
        return renderAbout();

      case "skills":
        return renderSkills();

      case "projects":
        return renderProjects();

      case "contact":
        return renderContact();

      case "dashboard":
      default:
        return renderDashboard();
    }
  };


  // ========================================
  // MAIN ADMIN UI
  // ========================================

  return (

    <div className="admin-layout">


      {/* ================================== */}
      {/* SIDEBAR */}
      {/* ================================== */}

      <aside className="admin-sidebar">


        {/* Sidebar heading */}

        <div className="sidebar-header">

          <h2>
            Portfolio Admin
          </h2>

        </div>


        {/* Navigation */}

        <nav className="sidebar-nav">


          {/* Dashboard */}

          <button
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          >

            <span className="sidebar-icon">
              🏠
            </span>

            <span className="sidebar-text">
              Dashboard
            </span>

          </button>


          {/* Hero */}

          <button
            className={
              activeSection === "hero"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("hero")
            }
          >

            <span className="sidebar-icon">
              👤
            </span>

            <span className="sidebar-text">
              Hero
            </span>

          </button>


          {/* About */}

          <button
            className={
              activeSection === "about"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("about")
            }
          >

            <span className="sidebar-icon">
              ℹ️
            </span>

            <span className="sidebar-text">
              About
            </span>

          </button>


          {/* Skills */}

          <button
            className={
              activeSection === "skills"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("skills")
            }
          >

            <span className="sidebar-icon">
              🛠️
            </span>

            <span className="sidebar-text">
              Skills
            </span>

          </button>


          {/* Projects */}

          <button
            className={
              activeSection === "projects"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("projects")
            }
          >

            <span className="sidebar-icon">
              📁
            </span>

            <span className="sidebar-text">
              Projects
            </span>

          </button>


          {/* Contact */}

          <button
            className={
              activeSection === "contact"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("contact")
            }
          >

            <span className="sidebar-icon">
              ✉️
            </span>

            <span className="sidebar-text">
              Contact
            </span>

          </button>

        </nav>


        {/* ================================== */}
        {/* LOGOUT */}
        {/* ================================== */}

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >

          <span className="sidebar-icon">
            🚪
          </span>

          <span className="sidebar-text">
            Logout
          </span>

        </button>

      </aside>


      {/* ================================== */}
      {/* MAIN CONTENT */}
      {/* ================================== */}

      <main className="admin-main">


        {/* Top bar */}

        <header className="admin-topbar">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Welcome, {username}
            </p>

          </div>

        </header>


        {/* ================================== */}
        {/* GLOBAL ERROR */}
        {/* ================================== */}

        {error && (

          <div className="admin-error">

            {error}

          </div>

        )}


        {/* ================================== */}
        {/* CURRENT SECTION */}
        {/* ================================== */}

        {renderActiveSection()}

      </main>

    </div>
  );
}


// ========================================
// EXPORT
// ========================================

export default AdminDashboard;