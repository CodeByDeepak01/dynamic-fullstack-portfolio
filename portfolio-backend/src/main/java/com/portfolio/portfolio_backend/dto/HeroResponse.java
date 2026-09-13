package com.portfolio.portfolio_backend.dto;

public class HeroResponse {

    private Long id;
    private String name;
    private String intro;
    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String leetcodeUrl;

    public HeroResponse() {
    }

    public HeroResponse(
            Long id,
            String name,
            String intro,
            String resumeUrl,
            String githubUrl,
            String linkedinUrl,
            String leetcodeUrl
    ) {
        this.id = id;
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

    public String getIntro() {
        return intro;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public String getLeetcodeUrl() {
        return leetcodeUrl;
    }
}