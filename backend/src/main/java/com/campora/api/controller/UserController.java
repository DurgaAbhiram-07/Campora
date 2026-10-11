package com.campora.api.controller;

import com.campora.api.dto.ApiResponse;
import com.campora.api.model.User;
import com.campora.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByCollegeId(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(user)
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody User updatedData) {
        User updatedUser = userService.updateProfile(userDetails.getUsername(), updatedData);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Profile updated successfully")
                .data(updatedUser)
                .build());
    }
}
