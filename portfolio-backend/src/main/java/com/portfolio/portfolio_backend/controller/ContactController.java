package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.ContactRequest;
import com.portfolio.portfolio_backend.dto.ContactResponse;
import com.portfolio.portfolio_backend.service.ContactService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/api/contact")
    public ContactResponse getContact() {
        return contactService.getContact();
    }

    @PostMapping("/api/contact")
    public ContactResponse createContact(
            @Valid @RequestBody ContactRequest request
    ) {
        return contactService.createContact(request);
    }

    @PutMapping("/api/contact/{id}")
    public ContactResponse updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactRequest request
    ) {
        return contactService.updateContact(id, request);
    }
}