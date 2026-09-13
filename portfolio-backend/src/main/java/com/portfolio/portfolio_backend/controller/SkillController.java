package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.SkillRequest;
import com.portfolio.portfolio_backend.dto.SkillResponse;
import com.portfolio.portfolio_backend.service.SkillService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // GET
    @GetMapping("/api/skills")
    public List<SkillResponse> getSkills() {
        return skillService.getAllSkills();
    }

    // POST
    @PostMapping("/api/skills")
    public SkillResponse createSkill(
            @Valid @RequestBody SkillRequest request
    ) {
        return skillService.createSkill(request);
    }

    // PUT
    @PutMapping("/api/skills/{id}")
    public SkillResponse updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest request
    ) {
        return skillService.updateSkill(id, request);
    }

    // DELETE
    @DeleteMapping("/api/skills/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
}