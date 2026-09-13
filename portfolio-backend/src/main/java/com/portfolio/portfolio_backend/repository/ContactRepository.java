package com.portfolio.portfolio_backend.repository;

import com.portfolio.portfolio_backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}