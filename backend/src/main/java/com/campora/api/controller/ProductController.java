package com.campora.api.controller;

import com.campora.api.dto.ApiResponse;
import com.campora.api.dto.ProductRequest;
import com.campora.api.model.Product;
import com.campora.api.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<Product> products = productService.getAllProducts(category, search);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Products retrieved successfully")
                .data(products)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product details retrieved")
                .data(product)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(
            @Valid @RequestBody ProductRequest productRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        Product createdProduct = productService.createProduct(productRequest, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product listed successfully on Campora")
                .data(createdProduct)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        productService.deleteProduct(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Product removed successfully")
                .build());
    }
}
