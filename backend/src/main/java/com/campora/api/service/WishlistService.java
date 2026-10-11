package com.campora.api.service;

import com.campora.api.model.Product;
import com.campora.api.model.Wishlist;
import com.campora.api.repository.ProductRepository;
import com.campora.api.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Wishlist> getUserWishlist(String userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public List<String> getUserWishlistProductIds(String userId) {
        return wishlistRepository.findByUserId(userId).stream()
                .map(Wishlist::getProductId)
                .collect(Collectors.toList());
    }

    public Wishlist addToWishlist(String userId, String productId) {
        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            return existing.get();
        }
        Wishlist item = Wishlist.builder()
                .userId(userId)
                .productId(productId)
                .build();

        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product p = productOpt.get();
            p.setWishlistCount(p.getWishlistCount() + 1);
            productRepository.save(p);
        }

        return wishlistRepository.save(item);
    }

    public void removeFromWishlist(String userId, String productId) {
        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            wishlistRepository.deleteByUserIdAndProductId(userId, productId);
            Optional<Product> productOpt = productRepository.findById(productId);
            if (productOpt.isPresent()) {
                Product p = productOpt.get();
                if (p.getWishlistCount() > 0) {
                    p.setWishlistCount(p.getWishlistCount() - 1);
                    productRepository.save(p);
                }
            }
        }
    }
}
