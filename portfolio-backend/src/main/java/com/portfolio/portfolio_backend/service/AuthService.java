package com.portfolio.portfolio_backend.service;

import com.portfolio.portfolio_backend.dto.AuthRequest;
import com.portfolio.portfolio_backend.dto.AuthResponse;
import com.portfolio.portfolio_backend.model.Admin;
import com.portfolio.portfolio_backend.repository.AdminRepository;
import com.portfolio.portfolio_backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse login(AuthRequest request) {

        Admin admin = adminRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password")
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(admin.getUsername());

        return new AuthResponse(
                token,
                admin.getUsername()
        );
    }
}