package com.campora.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank
    private String collegeId;

    @NotBlank
    private String password;
}
