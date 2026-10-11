package com.campora.api.service;

import com.campora.api.model.User;
import com.campora.api.repository.ProductRepository;
import com.campora.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("activeListings", productRepository.findByStatus("ACTIVE").size());
        return stats;
    }

    public User verifyUser(String userId, boolean status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        user.setVerified(status);
        return userRepository.save(user);
    }
}
