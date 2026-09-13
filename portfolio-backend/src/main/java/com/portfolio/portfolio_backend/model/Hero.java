package com.portfolio.portfolio_backend.model;

import jakarta.persistence.*;

@Entity
public class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String intro;

    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String leetcodeUrl;

    public Hero() {
    }

    public Hero(
            String name,
            String intro,
            String resumeUrl,
            String githubUrl,
            String linkedinUrl,
            String leetcodeUrl
    ) {
        this.name = name;
        this.intro = intro;
        this.resumeUrl = resumeUrl;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.leetcodeUrl = leetcodeUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getLeetcodeUrl() {
        return leetcodeUrl;
    }

    public void setLeetcodeUrl(String leetcodeUrl) {
        this.leetcodeUrl = leetcodeUrl;
    }
}