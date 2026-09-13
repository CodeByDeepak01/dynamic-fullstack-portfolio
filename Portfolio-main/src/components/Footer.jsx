import "./Footer.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Deepak</h3>

        <p>
          Aspiring Java Full Stack Developer passionate about building scalable
          and modern web applications.
        </p>

        <div className="footer-links">
          <a
            href="https://github.com/CodeByDeepak01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/deepak-18b74a310"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://leetcode.com/u/CodeByDeepak/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandLeetcode />
          </a>
        </div>

        <p className="copyright">© 2026 Deepak. Built with React & Vite.</p>
      </div>
    </footer>
  );
}

export default Footer;
