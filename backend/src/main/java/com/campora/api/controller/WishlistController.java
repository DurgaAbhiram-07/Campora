package com.campora.api.controller;

import com.campora.api.dto.ApiResponse;
import com.campora.api.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserWishlist(@PathVariable String userId) {
        List<String> wishlistProductIds = wishlistService.getUserWishlistProductIds(userId);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Wishlist retrieved successfully")
                .data(wishlistProductIds)
                .build());
    }

    @PostMapping("/{userId}/{productId}")
    public ResponseEntity<ApiResponse> addToWishlist(@PathVariable String userId, @PathVariable String productId) {
        wishlistService.addToWishlist(userId, productId);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product added to wishlist")
                .build());
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<ApiResponse> removeFromWishlist(@PathVariable String userId, @PathVariable String productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product removed from wishlist")
                .build());
    }
}
