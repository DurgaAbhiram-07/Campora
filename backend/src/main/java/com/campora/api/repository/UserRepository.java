package com.campora.api.repository;

import com.campora.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByCollegeId(String collegeId);
    Optional<User> findByEmail(String email);
    Boolean existsByCollegeId(String collegeId);
    Boolean existsByEmail(String email);
}
