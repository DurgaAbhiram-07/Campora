package com.campora.api.service;

import com.campora.api.dto.JwtResponse;
import com.campora.api.dto.LoginRequest;
import com.campora.api.dto.SignupRequest;
import com.campora.api.model.User;
import com.campora.api.repository.UserRepository;
import com.campora.api.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByCollegeId(loginRequest.getCollegeId())
                .orElseThrow(() -> new RuntimeException("Error: Invalid College ID or Password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Error: Invalid College ID or Password");
        }

        String token = jwtUtils.generateJwtToken(user.getCollegeId());

        return JwtResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .collegeId(user.getCollegeId())
                .email(user.getEmail())
                .role(user.getRole())
                .verified(user.isVerified())
                .build();
    }

    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByCollegeId(signupRequest.getCollegeId())) {
            throw new RuntimeException("Error: College ID is already registered!");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = User.builder()
                .name(signupRequest.getName())
                .collegeId(signupRequest.getCollegeId())
                .email(signupRequest.getEmail())
                .phone(signupRequest.getPhone())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .department(signupRequest.getDepartment())
                .year(signupRequest.getYear())
                .hosteller(signupRequest.isHosteller())
                .profilePhoto(signupRequest.getProfilePhoto())
                .idCard(signupRequest.getIdCard())
                .verified(false) // Requires admin verification
                .role("STUDENT")
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }
}
