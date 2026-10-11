package com.campora.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String title;
    private String description;
    private Double price;
    private String category;
    private String condition;
    private List<String> images;
    private String sellerId;
    private String sellerName;
    private String sellerAvatar;
    private String sellerDepartment;
    private boolean sellerVerified;
    private String college;
    private String department;
    private String location;
    private Double latitude;
    private Double longitude;
    private boolean negotiable;
    private boolean deliveryAvailable;
    private int wishlistCount;
    private int views;
    private String status; // ACTIVE, SOLD, RESERVED, REJECTED
    private List<String> tags;
    private LocalDateTime createdAt;
}
