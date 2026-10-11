package com.campora.api.controller;

import com.campora.api.dto.ApiResponse;
import com.campora.api.model.User;
import com.campora.api.service.AdminService;
import com.campora.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ProductService productService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse> getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(stats)
                .build());
    }

    @PostMapping("/verify-user")
    public ResponseEntity<ApiResponse> verifyUser(@RequestParam String userId, @RequestParam boolean status) {
        User verifiedUser = adminService.verifyUser(userId, status);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("User verification status updated to: " + status)
                .data(verifiedUser)
                .build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse> adminDeleteProduct(@PathVariable String id) {
        productService.deleteProduct(id, "FAC8802");
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product deleted by Admin")
                .build());
    }
}
