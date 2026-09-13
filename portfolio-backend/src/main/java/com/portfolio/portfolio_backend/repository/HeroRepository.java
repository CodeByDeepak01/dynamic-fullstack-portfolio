package com.portfolio.portfolio_backend.repository;

import com.portfolio.portfolio_backend.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeroRepository extends JpaRepository<Hero, Long> {
}