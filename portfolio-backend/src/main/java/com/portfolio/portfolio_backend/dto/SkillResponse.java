package com.portfolio.portfolio_backend.dto;

public class SkillResponse {

    private Long id;
    private String name;
    private String level;
    private String description;
    private String icon;

    public SkillResponse() {
    }

    public SkillResponse(
            Long id,
            String name,
            String level,
            String description,
            String icon
    ) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.description = description;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLevel() {
        return level;
    }

    public String getDescription() {
        return description;
    }

    public String getIcon() {
        return icon;
    }
}