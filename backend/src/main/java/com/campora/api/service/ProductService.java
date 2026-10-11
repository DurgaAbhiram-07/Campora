package com.campora.api.service;

import com.campora.api.dto.ProductRequest;
import com.campora.api.model.Product;
import com.campora.api.model.User;
import com.campora.api.repository.ProductRepository;
import com.campora.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Product> getAllProducts(String category, String search) {
        if (category != null && !category.isEmpty() && !"All".equalsIgnoreCase(category)) {
            return productRepository.findByCategory(category);
        }
        if (search != null && !search.isEmpty()) {
            return productRepository.findByTitleContainingIgnoreCase(search);
        }
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setViews(product.getViews() + 1);
        return productRepository.save(product);
    }

    public Product createProduct(ProductRequest request, String collegeId) {
        User seller = userRepository.findByCollegeId(collegeId)
                .orElseThrow(() -> new RuntimeException("Seller user not found"));

        Product product = Product.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .condition(request.getCondition())
                .images(request.getImages())
                .sellerId(seller.getId())
                .sellerName(seller.getName())
                .sellerAvatar(seller.getProfilePhoto())
                .sellerDepartment(seller.getDepartment())
                .sellerVerified(seller.isVerified())
                .college("Chaitanya Engineering College")
                .department(request.getDepartment() != null ? request.getDepartment() : seller.getDepartment())
                .location(request.getLocation())
                .negotiable(request.isNegotiable())
                .deliveryAvailable(request.isDeliveryAvailable())
                .wishlistCount(0)
                .views(0)
                .status("ACTIVE")
                .tags(request.getTags())
                .createdAt(LocalDateTime.now())
                .build();

        return productRepository.save(product);
    }

    public void deleteProduct(String id, String collegeId) {
        Product product = getProductById(id);
        User user = userRepository.findByCollegeId(collegeId).orElseThrow();
        if (!product.getSellerId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Unauthorized to delete this product");
        }
        productRepository.deleteById(id);
    }
}
