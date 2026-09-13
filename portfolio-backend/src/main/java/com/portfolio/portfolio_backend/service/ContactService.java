package com.portfolio.portfolio_backend.service;

import com.portfolio.portfolio_backend.dto.ContactRequest;
import com.portfolio.portfolio_backend.dto.ContactResponse;
import com.portfolio.portfolio_backend.exception.ResourceNotFoundException;
import com.portfolio.portfolio_backend.model.Contact;
import com.portfolio.portfolio_backend.repository.ContactRepository;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactResponse getContact() {

        Contact contact = contactRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact data not found")
                );

        return convertToResponse(contact);
    }

    public ContactResponse createContact(ContactRequest request) {

        Contact contact = new Contact();

        contact.setEmail(request.getEmail());
        contact.setLocation(request.getLocation());
        contact.setGithubUrl(request.getGithubUrl());
        contact.setLinkedinUrl(request.getLinkedinUrl());
        contact.setLeetcodeUrl(request.getLeetcodeUrl());

        Contact savedContact = contactRepository.save(contact);

        return convertToResponse(savedContact);
    }

    public ContactResponse updateContact(Long id, ContactRequest request) {

        Contact existingContact = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Contact not found with id: " + id
                        )
                );

        existingContact.setEmail(request.getEmail());
        existingContact.setLocation(request.getLocation());
        existingContact.setGithubUrl(request.getGithubUrl());
        existingContact.setLinkedinUrl(request.getLinkedinUrl());
        existingContact.setLeetcodeUrl(request.getLeetcodeUrl());

        Contact updatedContact = contactRepository.save(existingContact);

        return convertToResponse(updatedContact);
    }

    private ContactResponse convertToResponse(Contact contact) {

        return new ContactResponse(
                contact.getId(),
                contact.getEmail(),
                contact.getLocation(),
                contact.getGithubUrl(),
                contact.getLinkedinUrl(),
                contact.getLeetcodeUrl()
        );
    }
}