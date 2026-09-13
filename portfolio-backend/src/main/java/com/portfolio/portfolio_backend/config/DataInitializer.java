package com.portfolio.portfolio_backend.config;

import com.portfolio.portfolio_backend.model.About;
import com.portfolio.portfolio_backend.model.Contact;
import com.portfolio.portfolio_backend.model.Hero;
import com.portfolio.portfolio_backend.model.Project;
import com.portfolio.portfolio_backend.model.Skill;

import com.portfolio.portfolio_backend.repository.AboutRepository;
import com.portfolio.portfolio_backend.repository.ContactRepository;
import com.portfolio.portfolio_backend.repository.HeroRepository;
import com.portfolio.portfolio_backend.repository.ProjectRepository;
import com.portfolio.portfolio_backend.repository.SkillRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.portfolio.portfolio_backend.model.Admin;
import com.portfolio.portfolio_backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Configuration
public class DataInitializer {

    private final AboutRepository aboutRepository;
    private final ContactRepository contactRepository;
    private final HeroRepository heroRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public DataInitializer(
            AboutRepository aboutRepository,
            ContactRepository contactRepository,
            HeroRepository heroRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.aboutRepository = aboutRepository;
        this.contactRepository = contactRepository;
        this.heroRepository = heroRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    @Bean
    CommandLineRunner initializeData() {

        return args -> {

            if (adminRepository.count() == 0) {

                String encodedPassword =
                        passwordEncoder.encode(adminPassword);

                adminRepository.save(
                        new Admin(
                                adminUsername,
                                encodedPassword,
                                "ADMIN"
                        )
                );

                System.out.println("Admin user created.");
            }

            // =========================
            // ABOUT DATA
            // =========================

            if (aboutRepository.count() == 0) {

                aboutRepository.save(
                        new About(
                                "I am a passionate Java Full Stack Developer with a strong interest in building scalable and user-friendly web applications.",

                                "I enjoy working with Java, Spring Boot, React, and databases to develop complete full-stack applications.",

                                "I am continuously improving my problem-solving and development skills by working on projects and practicing Data Structures and Algorithms."
                        )
                );
            }


            // =========================
            // CONTACT DATA
            // =========================

            if (contactRepository.count() == 0) {

                contactRepository.save(
                        new Contact(
                                "deepakpal789557@gmail.com",
                                "Hapur, Uttar Pradesh",
                                "https://github.com/CodeByDeepak01",
                                "https://www.linkedin.com/in/deepak-18b74a310",
                                "https://leetcode.com/u/CodeByDeepak/"
                        )
                );
            }


            // =========================
            // HERO DATA
            // =========================

            if (heroRepository.count() == 0) {

                heroRepository.save(
                        new Hero(
                                "Deepak",
                                "I build scalable web applications using Java, Spring Boot, React, and MySQL.",
                                "https://drive.google.com/file/d/1og-xh0_0_0DvD_RXmu5iqCJx8xjEcHzx/view?usp=sharing",
                                "https://github.com/CodeByDeepak01",
                                "https://www.linkedin.com/in/deepak-18b74a310",
                                "https://leetcode.com/u/CodeByDeepak/"
                        )
                );
            }


            // =========================
            // PROJECT DATA
            // =========================

            if (projectRepository.count() == 0) {

                projectRepository.save(
                        new Project(
                                "LeetMatric",
                                "Track LeetCode profile statistics and visualize progress.",
                                List.of(
                                        "HTML",
                                        "CSS",
                                        "JavaScript",
                                        "LeetCode GraphQL API"
                                ),
                                "Completed",
                                "/images/leetmatric.png",
                                "https://github.com/CodeByDeepak01/LeetMatric",
                                "https://leetmatric.com/"
                        )
                );

                projectRepository.save(
                        new Project(
                                "Portfolio Website",
                                "Modern portfolio website showcasing skills and projects.",
                                List.of(
                                        "React",
                                        "CSS",
                                        "Vite"
                                ),
                                "Completed",
                                "/images/portfolio.png",
                                "https://github.com/CodeByDeepak01/Portfolio",
                                "https://deepak-portfolio-zcj5.onrender.com"
                        )
                );

                projectRepository.save(
                        new Project(
                                "Authify",
                                "Secure Authentication System.",
                                List.of(
                                        "Java",
                                        "Spring Boot",
                                        "MySQL",
                                        "React",
                                        "Spring Security",
                                        "JWT",
                                        "REST API"
                                ),
                                "In Progress",
                                "/images/authify.png",
                                "https://github.com/CodeByDeepak01/Authify",
                                "https://authify.com/"
                        )
                );
            }


            // =========================
            // SKILL DATA
            // =========================

            if (skillRepository.count() == 0) {

                skillRepository.save(
                        new Skill(
                                "Java",
                                "Proficient",
                                "OOP, Collections, Exception Handling, DSA",
                                "java"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "Problem Solving",
                                "Working Knowledge",
                                "Data Structures, Algorithms, LeetCode",
                                "problem-solving"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "Spring Boot",
                                "Working Knowledge",
                                "REST APIs, Hibernate, JPA, MVC",
                                "springboot"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "MySQL",
                                "Working Knowledge",
                                "Queries, Joins, Database Design",
                                "mysql"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "REST APIs",
                                "Working Knowledge",
                                "CRUD Operations, API Integration",
                                "api"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "HTML",
                                "Proficient",
                                "Semantic HTML, Forms, Accessibility",
                                "html"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "CSS",
                                "Proficient",
                                "Flexbox, Grid, Responsive Design",
                                "css"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "JavaScript",
                                "Working Knowledge",
                                "ES6+, DOM, Async Programming",
                                "javascript"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "React",
                                "Working Knowledge",
                                "Components, Hooks, State Management",
                                "react"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "Git & GitHub",
                                "Working Knowledge",
                                "Version Control, Collaboration",
                                "git"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "C Language",
                                "Working Knowledge",
                                "Pointers, Functions, Problem Solving",
                                "c"
                        )
                );

                skillRepository.save(
                        new Skill(
                                "Python",
                                "Basic",
                                "Core Python, Fundamentals",
                                "python"
                        )
                );
            }

            System.out.println("Portfolio data initialization completed.");

        };
    }
}