package com.portfolio.portfolio_backend.controller;

import com.portfolio.portfolio_backend.dto.AuthRequest;
import com.portfolio.portfolio_backend.dto.AuthResponse;
import com.portfolio.portfolio_backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody AuthRequest request
    ) {
        return authService.login(request);
    }
}