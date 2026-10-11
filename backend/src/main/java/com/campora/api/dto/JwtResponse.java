package com.campora.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String id;
    private String name;
    private String collegeId;
    private String email;
    private String role;
    private boolean verified;
}
