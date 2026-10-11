package com.campora.api;

import com.campora.api.model.Product;
import com.campora.api.repository.ProductRepository;
import com.campora.api.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    @Test
    public void testGetAllProducts() {
        Product mockProduct = Product.builder()
                .id("prod_1")
                .title("MacBook Air M2")
                .price(68500.0)
                .category("Electronics")
                .build();

        Mockito.when(productRepository.findAll()).thenReturn(Collections.singletonList(mockProduct));

        List<Product> products = productService.getAllProducts(null, null);
        assertNotNull(products);
        assertEquals(1, products.size());
        assertEquals("MacBook Air M2", products.get(0).getTitle());
    }
}
