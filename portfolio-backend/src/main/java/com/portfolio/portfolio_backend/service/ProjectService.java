// ========================================
// PACKAGE
// ========================================

package com.portfolio.portfolio_backend.service;


// ========================================
// DTO IMPORTS
// ========================================

import com.portfolio.portfolio_backend.dto.ProjectRequest;
import com.portfolio.portfolio_backend.dto.ProjectResponse;
import com.portfolio.portfolio_backend.dto.ProjectUploadRequest;


// ========================================
// EXCEPTION IMPORT
// ========================================

import com.portfolio.portfolio_backend.exception.ResourceNotFoundException;


// ========================================
// ENTITY + REPOSITORY
// ========================================

import com.portfolio.portfolio_backend.model.Project;
import com.portfolio.portfolio_backend.repository.ProjectRepository;


// ========================================
// SPRING IMPORTS
// ========================================

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


// ========================================
// JAVA IMPORTS
// ========================================

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;


// ========================================
// PROJECT SERVICE
// ========================================

@Service
public class ProjectService {


    // ========================================
    // REPOSITORY
    // ========================================

    private final ProjectRepository projectRepository;


    // ========================================
    // UPLOAD DIRECTORY
    // ========================================

    /*
     * Uploaded project images will be stored
     * inside the "uploads" folder.
     *
     * Example:
     *
     * uploads/
     *     abc-123.png
     *     xyz-456.jpg
     */

    private final Path uploadDirectory =
            Paths.get("uploads");


    // ========================================
    // CONSTRUCTOR
    // ========================================

    public ProjectService(
            ProjectRepository projectRepository
    ) {
        this.projectRepository = projectRepository;
    }


    // ========================================
    // CREATE PROJECT WITH IMAGE
    // ========================================

    /*
     * Used by:
     *
     * POST /api/projects/upload
     *
     * This method:
     *
     * 1. Validates image
     * 2. Creates uploads folder
     * 3. Generates unique filename
     * 4. Saves image
     * 5. Saves image path in database
     * 6. Saves project
     */

    public ProjectResponse createProjectWithImage(
            ProjectUploadRequest request,
            MultipartFile image
    ) {

        // Validate uploaded image
        validateImage(image);


        try {

            // Create uploads folder if it doesn't exist

            Files.createDirectories(
                    uploadDirectory
            );


            // Generate unique filename

            String fileName =
                    UUID.randomUUID()
                            + getFileExtension(
                            image.getOriginalFilename()
                    );


            // Complete file path

            Path filePath =
                    uploadDirectory.resolve(
                            fileName
                    );


            // Save uploaded file

            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );


            // ====================================
            // CREATE PROJECT ENTITY
            // ====================================

            Project project =
                    new Project();


            project.setName(
                    request.getName()
            );

            project.setDescription(
                    request.getDescription()
            );

            project.setTechStack(
                    request.getTechStack()
            );

            project.setStatus(
                    request.getStatus()
            );


            /*
             * Store only the URL/path in database.
             *
             * Actual image:
             * uploads/abc.png
             *
             * Database:
             * /uploads/abc.png
             */

            project.setImage(
                    "/uploads/" + fileName
            );


            project.setGithubUrl(
                    request.getGithubUrl()
            );

            project.setDemoUrl(
                    request.getDemoUrl()
            );


            // Save project in database

            Project savedProject =
                    projectRepository.save(
                            project
                    );


            return convertToResponse(
                    savedProject
            );


        } catch (IOException exception) {

            throw new RuntimeException(
                    "Failed to save project image"
            );
        }
    }


    // ========================================
    // UPDATE PROJECT WITH OPTIONAL IMAGE
    // ========================================

    /*
     * Used by:
     *
     * PUT /api/projects/{id}/upload
     *
     * Image is optional during update.
     *
     * If no new image is selected:
     *     old image remains.
     *
     * If new image is selected:
     *     new image is saved and its path
     *     replaces the old image path.
     */

    public ProjectResponse updateProjectWithImage(
            Long id,
            ProjectUploadRequest request,
            MultipartFile image
    ) {


        // ====================================
        // FIND EXISTING PROJECT
        // ====================================

        Project existingProject =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Project not found with id: "
                                                + id
                                )
                        );


        // ====================================
        // UPDATE PROJECT INFORMATION
        // ====================================

        existingProject.setName(
                request.getName()
        );

        existingProject.setDescription(
                request.getDescription()
        );

        existingProject.setTechStack(
                request.getTechStack()
        );

        existingProject.setStatus(
                request.getStatus()
        );

        existingProject.setGithubUrl(
                request.getGithubUrl()
        );

        existingProject.setDemoUrl(
                request.getDemoUrl()
        );


        // ====================================
        // UPDATE IMAGE IF PROVIDED
        // ====================================

        if (image != null &&
                !image.isEmpty()) {


            // Validate new image

            validateImage(image);


            try {

                // Create uploads folder

                Files.createDirectories(
                        uploadDirectory
                );


                // Generate unique filename

                String fileName =
                        UUID.randomUUID()
                                + getFileExtension(
                                image.getOriginalFilename()
                        );


                // Create file path

                Path filePath =
                        uploadDirectory.resolve(
                                fileName
                        );


                // Save new image

                Files.copy(
                        image.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );


                // Update database image path

                existingProject.setImage(
                        "/uploads/" + fileName
                );


            } catch (IOException exception) {

                throw new RuntimeException(
                        "Failed to save project image"
                );
            }
        }


        // ====================================
        // SAVE UPDATED PROJECT
        // ====================================

        Project updatedProject =
                projectRepository.save(
                        existingProject
                );


        return convertToResponse(
                updatedProject
        );
    }


    // ========================================
    // IMAGE VALIDATION
    // ========================================

    /*
     * Allowed:
     *
     * JPG
     * JPEG
     * PNG
     * WEBP
     *
     * Maximum size:
     * 5 MB
     */

    private void validateImage(
            MultipartFile image
    ) {


        // Image must exist

        if (image == null ||
                image.isEmpty()) {

            throw new IllegalArgumentException(
                    "Project image is required"
            );
        }


        // Maximum 5 MB

        if (image.getSize() >
                5 * 1024 * 1024) {

            throw new IllegalArgumentException(
                    "Image size must not exceed 5MB"
            );
        }


        // Get MIME type

        String contentType =
                image.getContentType();


        // Check MIME type

        if (contentType == null ||
                !(
                        contentType.equals(
                                "image/jpeg"
                        )

                                ||

                                contentType.equals(
                                        "image/png"
                                )

                                ||

                                contentType.equals(
                                        "image/webp"
                                )
                )
        ) {

            throw new IllegalArgumentException(
                    "Only JPG, PNG and WEBP images are allowed"
            );
        }
    }


    // ========================================
    // GET FILE EXTENSION
    // ========================================

    private String getFileExtension(
            String originalFilename
    ) {


        // Filename must contain extension

        if (originalFilename == null ||
                !originalFilename.contains(".")) {

            throw new IllegalArgumentException(
                    "Invalid image filename"
            );
        }


        // Get extension

        String extension =
                originalFilename
                        .substring(
                                originalFilename
                                        .lastIndexOf(".")
                        )
                        .toLowerCase();


        // Validate extension

        if (!extension.equals(".jpg") &&
                !extension.equals(".jpeg") &&
                !extension.equals(".png") &&
                !extension.equals(".webp")) {

            throw new IllegalArgumentException(
                    "Unsupported image format"
            );
        }


        return extension;
    }


    // ========================================
    // GET ALL PROJECTS
    // ========================================

    /*
     * GET /api/projects
     */

    public List<ProjectResponse> getAllProjects() {

        return projectRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // ========================================
    // CREATE PROJECT - OLD JSON API
    // ========================================

    /*
     * Existing API.
     *
     * POST /api/projects
     *
     * Keeping this method means old functionality
     * doesn't suddenly break.
     */

    public ProjectResponse createProject(
            ProjectRequest request
    ) {

        Project project =
                new Project();


        project.setName(
                request.getName()
        );

        project.setDescription(
                request.getDescription()
        );

        project.setTechStack(
                request.getTechStack()
        );

        project.setStatus(
                request.getStatus()
        );

        project.setImage(
                request.getImage()
        );

        project.setGithubUrl(
                request.getGithubUrl()
        );

        project.setDemoUrl(
                request.getDemoUrl()
        );


        Project savedProject =
                projectRepository.save(
                        project
                );


        return convertToResponse(
                savedProject
        );
    }


    // ========================================
    // UPDATE PROJECT - OLD JSON API
    // ========================================

    /*
     * Existing API.
     *
     * PUT /api/projects/{id}
     *
     * Kept for backward compatibility.
     */

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request
    ) {


        // Find existing project

        Project existingProject =
                projectRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Project not found with id: "
                                                + id
                                )
                        );


        // Update fields

        existingProject.setName(
                request.getName()
        );

        existingProject.setDescription(
                request.getDescription()
        );

        existingProject.setTechStack(
                request.getTechStack()
        );

        existingProject.setStatus(
                request.getStatus()
        );

        existingProject.setImage(
                request.getImage()
        );

        existingProject.setGithubUrl(
                request.getGithubUrl()
        );

        existingProject.setDemoUrl(
                request.getDemoUrl()
        );


        // Save changes

        Project updatedProject =
                projectRepository.save(
                        existingProject
                );


        return convertToResponse(
                updatedProject
        );
    }


    // ========================================
    // DELETE PROJECT
    // ========================================

    /*
     * DELETE /api/projects/{id}
     *
     * Note:
     * This currently deletes the database record.
     *
     * The uploaded image file is not deleted yet.
     * We can add image-file deletion separately.
     */

    public void deleteProject(
            Long id
    ) {


        // Check whether project exists

        if (!projectRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "Project not found with id: "
                            + id
            );
        }


        // Delete project

        projectRepository.deleteById(id);
    }


    // ========================================
    // ENTITY → RESPONSE DTO
    // ========================================

    private ProjectResponse convertToResponse(
            Project project
    ) {

        return new ProjectResponse(

                project.getId(),

                project.getName(),

                project.getDescription(),

                project.getTechStack(),

                project.getStatus(),

                project.getImage(),

                project.getGithubUrl(),

                project.getDemoUrl()
        );
    }
}