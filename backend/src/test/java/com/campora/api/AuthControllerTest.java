package com.campora.api;

import com.campora.api.dto.JwtResponse;
import com.campora.api.dto.LoginRequest;
import com.campora.api.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class AuthControllerTest {

    @MockBean
    private AuthService authService;

    @Test
    public void testLoginSuccess() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setCollegeId("2023CS1084");
        loginRequest.setPassword("password123");

        JwtResponse mockResponse = JwtResponse.builder()
                .token("mock-token-xyz")
                .collegeId("2023CS1084")
                .role("STUDENT")
                .build();

        Mockito.when(authService.authenticateUser(Mockito.any())).thenReturn(mockResponse);

        JwtResponse response = authService.authenticateUser(loginRequest);
        assertNotNull(response);
        assertEquals("2023CS1084", response.getCollegeId());
        assertEquals("mock-token-xyz", response.getToken());
    }
}
