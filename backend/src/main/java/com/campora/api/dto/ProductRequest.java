package com.campora.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Double price;

    @NotBlank
    private String category;

    private String condition;
    private List<String> images;
    private String location;
    private String department;
    private boolean negotiable;
    private boolean deliveryAvailable;
    private List<String> tags;
}
