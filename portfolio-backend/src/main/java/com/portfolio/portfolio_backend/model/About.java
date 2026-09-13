package com.portfolio.portfolio_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String paragraph1;

    @Column(columnDefinition = "TEXT")
    private String paragraph2;

    @Column(columnDefinition = "TEXT")
    private String paragraph3;

    public About() {
    }

    public About(String paragraph1, String paragraph2, String paragraph3) {
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