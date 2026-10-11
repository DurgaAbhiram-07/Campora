package com.campora.api.security;

import com.campora.api.model.User;
import com.campora.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String collegeId) throws UsernameNotFoundException {
        User user = userRepository.findByCollegeId(collegeId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with College ID: " + collegeId));

        return new org.springframework.security.core.userdetails.User(
                user.getCollegeId(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}
