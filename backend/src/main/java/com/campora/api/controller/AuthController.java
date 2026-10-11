package com.campora.api.controller;

import com.campora.api.dto.ApiResponse;
import com.campora.api.dto.JwtResponse;
import com.campora.api.dto.LoginRequest;
import com.campora.api.dto.SignupRequest;
import com.campora.api.model.User;
import com.campora.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Login successful")
                .data(jwtResponse)
                .build());
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody SignupRequest signupRequest) {
        User registeredUser = authService.registerUser(signupRequest);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Account registered successfully. Verification pending by Campus Admin.")
                .data(registeredUser)
                .build());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestParam String email) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("OTP verification code sent to campus email: " + email)
                .build());
    }
}
