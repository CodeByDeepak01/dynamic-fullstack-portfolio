package com.portfolio.portfolio_backend.service;

import com.portfolio.portfolio_backend.dto.AboutRequest;
import com.portfolio.portfolio_backend.dto.AboutResponse;
import com.portfolio.portfolio_backend.exception.ResourceNotFoundException;
import com.portfolio.portfolio_backend.model.About;
import com.portfolio.portfolio_backend.repository.AboutRepository;

import org.springframework.stereotype.Service;

@Service
public class AboutService {

    private final AboutRepository aboutRepository;

    public AboutService(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    // GET
    public AboutResponse getAbout() {

        About about = aboutRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("About data not found")
                );

        return convertToResponse(about);
    }

    // POST
    public AboutResponse createAbout(AboutRequest request) {

        About about = new About();

        about.setParagraph1(request.getParagraph1());
        about.setParagraph2(request.getParagraph2());
        about.setParagraph3(request.getParagraph3());

        About savedAbout = aboutRepository.save(about);

        return convertToResponse(savedAbout);
    }

    // PUT
    public AboutResponse updateAbout(
            Long id,
            AboutRequest request
    ) {

        About existingAbout = aboutRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "About not found with id: " + id
                        )
                );

        existingAbout.setParagraph1(request.getParagraph1());
        existingAbout.setParagraph2(request.getParagraph2());
        existingAbout.setParagraph3(request.getParagraph3());

        About updatedAbout = aboutRepository.save(existingAbout);

        return convertToResponse(updatedAbout);
    }

    // Entity → Response DTO
    private AboutResponse convertToResponse(About about) {

        return new AboutResponse(
                about.getId(),
                about.getParagraph1(),
                about.getParagraph2(),
                about.getParagraph3()
        );
    }
}