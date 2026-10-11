package com.campora.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String collegeId;

    @NotBlank
    @Email
    private String email;

    private String phone;

    @NotBlank
    private String password;

    private String department;
    private String year;
    private boolean hosteller;
    private String profilePhoto;
    private String idCard;
}
