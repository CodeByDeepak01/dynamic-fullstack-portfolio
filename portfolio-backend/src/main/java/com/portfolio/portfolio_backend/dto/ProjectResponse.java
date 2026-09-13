package com.portfolio.portfolio_backend.dto;

import java.util.List;

public class ProjectResponse {

    private Long id;
    private String name;
    private String description;
    private List<String> techStack;
    private String status;
    private String image;
    private String githubUrl;
    private String demoUrl;

    public ProjectResponse() {
    }

    public ProjectResponse(
            Long id,
            String name,
            String description,
            List<String> techStack,
            String status,
            String image,
            String githubUrl,
            String demoUrl
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.techStack = techStack;
        this.status = status;
        this.image = image;
        this.githubUrl = githubUrl;
        this.demoUrl = demoUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public String getStatus() {
        return status;
    }

    public String getImage() {
        return image;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getDemoUrl() {
        return demoUrl;
    }
}