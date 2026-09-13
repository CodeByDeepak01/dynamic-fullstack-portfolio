package com.portfolio.portfolio_backend.service;

import com.portfolio.portfolio_backend.dto.HeroRequest;
import com.portfolio.portfolio_backend.dto.HeroResponse;
import com.portfolio.portfolio_backend.exception.ResourceNotFoundException;
import com.portfolio.portfolio_backend.model.Hero;
import com.portfolio.portfolio_backend.repository.HeroRepository;

import org.springframework.stereotype.Service;

@Service
public class HeroService {

    private final HeroRepository heroRepository;

    public HeroService(HeroRepository heroRepository) {
        this.heroRepository = heroRepository;
    }

    // GET
    public HeroResponse getHero() {

        Hero hero = heroRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hero data not found")
                );

        return convertToResponse(hero);
    }

    // POST
    public HeroResponse createHero(HeroRequest request) {

        Hero hero = new Hero();

        hero.setName(request.getName());
        hero.setIntro(request.getIntro());
        hero.setResumeUrl(request.getResumeUrl());
        hero.setGithubUrl(request.getGithubUrl());
        hero.setLinkedinUrl(request.getLinkedinUrl());
        hero.setLeetcodeUrl(request.getLeetcodeUrl());

        Hero savedHero = heroRepository.save(hero);

        return convertToResponse(savedHero);
    }

    // PUT
    public HeroResponse updateHero(
            Long id,
            HeroRequest request
    ) {

        Hero existingHero = heroRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Hero not found with id: " + id
                        )
                );

        existingHero.setName(request.getName());
        existingHero.setIntro(request.getIntro());
        existingHero.setResumeUrl(request.getResumeUrl());
        existingHero.setGithubUrl(request.getGithubUrl());
        existingHero.setLinkedinUrl(request.getLinkedinUrl());
        existingHero.setLeetcodeUrl(request.getLeetcodeUrl());

        Hero updatedHero = heroRepository.save(existingHero);

        return convertToResponse(updatedHero);
    }

    // Entity → Response DTO
    private HeroResponse convertToResponse(Hero hero) {

        return new HeroResponse(
                hero.getId(),
                hero.getName(),
                hero.getIntro(),
                hero.getResumeUrl(),
                hero.getGithubUrl(),
                hero.getLinkedinUrl(),
                hero.getLeetcodeUrl()
        );
    }
}