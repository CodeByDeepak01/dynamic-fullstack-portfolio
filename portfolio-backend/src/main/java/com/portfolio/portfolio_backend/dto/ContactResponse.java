package com.portfolio.portfolio_backend.dto;

public class ContactResponse {

    private Long id;
    private String email;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String leetcodeUrl;

    public ContactResponse() {
    }

    public ContactResponse(
            Long id,
            String email,
            String location,
            String githubUrl,
            String linkedinUrl,
            String leetcodeUrl
    ) {
        this.id = id;
        this.email = email;
        this.location = location;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.leetcodeUrl = leetcodeUrl;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getLocation() {
        return location;
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