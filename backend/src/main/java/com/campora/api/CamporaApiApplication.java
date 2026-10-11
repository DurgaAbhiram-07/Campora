package com.campora.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CamporaApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CamporaApiApplication.class, args);
        System.out.println("==================================================");
        System.out.println("  Campora Campus OLX API Server Ready on :8080    ");
        System.out.println("==================================================");
    }
}
