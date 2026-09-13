import "./Contact.css";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

import emailjs from "@emailjs/browser";
import { useRef, useEffect, useState } from "react";

import { getContact } from "../api/contactApi";

function Contact() {
  const form = useRef();

  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getContact()
      .then((data) => {
        setContact(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load contact information.");
      });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "portfolio_gmail",
        "template_6m34uqg",
        form.current,
        "IGe-8W7Je47wEMic_",
      )
      .then(() => {
        alert("Thank you! Your message has been sent successfully.");
        form.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);

        alert(
          "Sorry! Something went wrong while sending your message. Please use the Gmail link on the left to contact me.",
        );
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-header">
        <h2>Contact</h2>
        <p>Let's connect and build something amazing together.</p>
      </div>

      <div className="contact-container">

        <div className="contact-left">
          <h2>Let's Work Together</h2>

          <p>
            I'm currently looking for internship and software development
            opportunities. Feel free to connect with me.
          </p>

          <div className="contact-links">

            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href={contact.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <TbBrandLeetcode />
              LeetCode
            </a>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaEnvelope />
              Gmail
            </a>

          </div>
        </div>

        <div className="contact-right">

          <form
            ref={form}
            className="contact-form"
            onSubmit={sendEmail}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">
              Send Message
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;