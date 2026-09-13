package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.ProjectRequest;
import com.portfolio.portfolio_backend.dto.ProjectResponse;
import com.portfolio.portfolio_backend.dto.ProjectUploadRequest;
import com.portfolio.portfolio_backend.service.ProjectService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    // Constructor Injection
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // =========================================================
    // GET ALL PROJECTS
    // Public API
    // =========================================================

    @GetMapping("/api/projects")
    public List<ProjectResponse> getProjects() {

        return projectService.getAllProjects();
    }

    // =========================================================
    // CREATE PROJECT - JSON
    // Old API - kept for compatibility
    // =========================================================

    @PostMapping("/api/projects")
    public ProjectResponse createProject(
            @Valid @RequestBody ProjectRequest request
    ) {

        return projectService.createProject(request);
    }

    // =========================================================
    // UPDATE PROJECT - JSON
    // Old API - kept for compatibility
    // =========================================================

    @PutMapping("/api/projects/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request
    ) {

        return projectService.updateProject(id, request);
    }

    // =========================================================
    // DELETE PROJECT
    // =========================================================

    @DeleteMapping("/api/projects/{id}")
    public void deleteProject(
            @PathVariable Long id
    ) {

        projectService.deleteProject(id);
    }

    // =========================================================
    // CREATE PROJECT WITH IMAGE
    // Multipart FormData API
    // =========================================================

    @PostMapping(
            value = "/api/projects/upload",
            consumes = "multipart/form-data"
    )
    public ProjectResponse createProjectWithImage(

            @Valid @RequestPart("project")
            ProjectUploadRequest request,

            @RequestPart("image")
            MultipartFile image
    ) {

        return projectService.createProjectWithImage(
                request,
                image
        );
    }

    // =========================================================
    // UPDATE PROJECT WITH IMAGE
    // Image is optional while editing
    // =========================================================

    @PutMapping(
            value = "/api/projects/{id}/upload",
            consumes = "multipart/form-data"
    )
    public ProjectResponse updateProjectWithImage(

            @PathVariable Long id,

            @Valid @RequestPart("project")
            ProjectUploadRequest request,

            @RequestPart(value = "image", required = false)
            MultipartFile image
    ) {

        return projectService.updateProjectWithImage(
                id,
                request,
                image
        );
    }
}