package com.campora.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String collegeId;

    @Indexed(unique = true)
    private String email;

    private String phone;
    private String password;
    private String department;
    private String year;
    private boolean hosteller;
    private String profilePhoto;
    private String idCard;
    private boolean verified;
    private String role; // STUDENT, FACULTY, ADMIN
    private LocalDateTime createdAt;
}
