package com.portfolio.portfolio_backend.service;

import com.portfolio.portfolio_backend.dto.SkillRequest;
import com.portfolio.portfolio_backend.dto.SkillResponse;
import com.portfolio.portfolio_backend.exception.ResourceNotFoundException;
import com.portfolio.portfolio_backend.model.Skill;
import com.portfolio.portfolio_backend.repository.SkillRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // GET
    public List<SkillResponse> getAllSkills() {

        return skillRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // POST
    public SkillResponse createSkill(SkillRequest request) {

        Skill skill = new Skill();

        skill.setName(request.getName());
        skill.setLevel(request.getLevel());
        skill.setDescription(request.getDescription());
        skill.setIcon(request.getIcon());

        Skill savedSkill = skillRepository.save(skill);

        return convertToResponse(savedSkill);
    }

    // PUT
    public SkillResponse updateSkill(
            Long id,
            SkillRequest request
    ) {

        Skill existingSkill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Skill not found with id: " + id
                        )
                );

        existingSkill.setName(request.getName());
        existingSkill.setLevel(request.getLevel());
        existingSkill.setDescription(request.getDescription());
        existingSkill.setIcon(request.getIcon());

        Skill updatedSkill = skillRepository.save(existingSkill);

        return convertToResponse(updatedSkill);
    }

    // DELETE
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Skill not found with id: " + id
            );
        }

        skillRepository.deleteById(id);
    }

    // Entity → Response DTO
    private SkillResponse convertToResponse(Skill skill) {

        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getLevel(),
                skill.getDescription(),
                skill.getIcon()
        );
    }
}