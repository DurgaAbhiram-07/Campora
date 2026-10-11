package com.campora.api.service;

import com.campora.api.model.User;
import com.campora.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByCollegeId(String collegeId) {
        return userRepository.findByCollegeId(collegeId)
                .orElseThrow(() -> new RuntimeException("User not found with College ID: " + collegeId));
    }

    public User updateProfile(String collegeId, User updatedUser) {
        User existing = getUserByCollegeId(collegeId);
        if (updatedUser.getName() != null) existing.setName(updatedUser.getName());
        if (updatedUser.getPhone() != null) existing.setPhone(updatedUser.getPhone());
        if (updatedUser.getDepartment() != null) existing.setDepartment(updatedUser.getDepartment());
        if (updatedUser.getProfilePhoto() != null) existing.setProfilePhoto(updatedUser.getProfilePhoto());
        return userRepository.save(existing);
    }
}
