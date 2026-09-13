package com.portfolio.portfolio_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class HeroRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Intro is required")
    private String intro;

    @NotBlank(message = "Resume URL is required")
    private String resumeUrl;

    @NotBlank(message = "GitHub URL is required")
    private String githubUrl;

    @NotBlank(message = "LinkedIn URL is required")
    private String linkedinUrl;

    @NotBlank(message = "LeetCode URL is required")
    private String leetcodeUrl;

    public HeroRequest() {
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