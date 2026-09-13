package com.portfolio.portfolio_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class AboutRequest {

    @NotBlank(message = "Paragraph 1 is required")
    private String paragraph1;

    @NotBlank(message = "Paragraph 2 is required")
    private String paragraph2;

    @NotBlank(message = "Paragraph 3 is required")
    private String paragraph3;

    public AboutRequest() {
    }

    public String getParagraph1() {
        return paragraph1;
    }

    public void setParagraph1(String paragraph1) {
        this.paragraph1 = paragraph1;
    }

    public String getParagraph2() {
        return paragraph2;
    }

    public void setParagraph2(String paragraph2) {
        this.paragraph2 = paragraph2;
    }

    public String getParagraph3() {
        return paragraph3;
    }

    public void setParagraph3(String paragraph3) {
        this.paragraph3 = paragraph3;
    }
}