package com.nexora.api.model;

import com.nexora.api.enums.ProductStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String sku;

    @Size(min = 3, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @Min(1)
    private BigDecimal price;

    @Min(1)
    private Integer stock;

    private String category;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Product(String sku, String name, String description, BigDecimal price,
                   Integer stock, String category, String status) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
