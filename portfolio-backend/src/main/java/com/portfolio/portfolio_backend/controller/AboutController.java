package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.AboutRequest;
import com.portfolio.portfolio_backend.dto.AboutResponse;
import com.portfolio.portfolio_backend.service.AboutService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
public class AboutController {

    private final AboutService aboutService;

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    // GET
    @GetMapping("/api/about")
    public AboutResponse getAbout() {
        return aboutService.getAbout();
    }

    // POST
    @PostMapping("/api/about")
    public AboutResponse createAbout(
            @Valid @RequestBody AboutRequest request
    ) {
        return aboutService.createAbout(request);
    }

    // PUT
    @PutMapping("/api/about/{id}")
    public AboutResponse updateAbout(
            @PathVariable Long id,
            @Valid @RequestBody AboutRequest request
    ) {
        return aboutService.updateAbout(id, request);
    }
}