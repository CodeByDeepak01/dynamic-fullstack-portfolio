package com.portfolio.portfolio_backend.dto;

public class AboutResponse {

    private Long id;
    private String paragraph1;
    private String paragraph2;
    private String paragraph3;

    public AboutResponse() {
    }

    public AboutResponse(
            Long id,
            String paragraph1,
            String paragraph2,
            String paragraph3
    ) {
        this.id = id;
        this.paragraph1 = paragraph1;
        this.paragraph2 = paragraph2;
        this.paragraph3 = paragraph3;
    }

    public Long getId() {
        return id;
    }

    public String getParagraph1() {
        return paragraph1;
    }

    public String getParagraph2() {
        return paragraph2;
    }

    public String getParagraph3() {
        return paragraph3;
    }
}