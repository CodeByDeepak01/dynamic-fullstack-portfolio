package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.HeroRequest;
import com.portfolio.portfolio_backend.dto.HeroResponse;
import com.portfolio.portfolio_backend.service.HeroService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HeroController {

    private final HeroService heroService;

    public HeroController(HeroService heroService) {
        this.heroService = heroService;
    }

    // GET
    @GetMapping("/api/hero")
    public HeroResponse getHero() {
        return heroService.getHero();
    }

    // POST
    @PostMapping("/api/hero")
    public HeroResponse createHero(
            @Valid @RequestBody HeroRequest request
    ) {
        return heroService.createHero(request);
    }

    // PUT
    @PutMapping("/api/hero/{id}")
    public HeroResponse updateHero(
            @PathVariable Long id,
            @Valid @RequestBody HeroRequest request
    ) {
        return heroService.updateHero(id, request);
    }
}