package com.nexora.api.mapper;

import com.nexora.api.dto.request.ProductRequestDTO;
import com.nexora.api.dto.response.ProductResponseDTO;
import com.nexora.api.model.Product;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponseDTO toResponseDTO(Product product) {
        if (product == null) return null;

        return ProductResponseDTO.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .category(product.getCategory())
                .status(product.getStatus())
                .lastUpdate(product.getUpdatedAt())
                .build();
    }

    public  List<ProductResponseDTO> toResponseDTOList(List<Product> products) {
        return products.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Product toEntity(ProductRequestDTO dto) {
        if (dto == null) return null;

        return Product.builder()
                .sku(dto.getSku())
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .category(dto.getCategory())
                .status(dto.getStatus().name())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public void updateEntityFromDTO(ProductRequestDTO dto, Product entity) {
        if (dto == null) return;

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setStock(dto.getStock());
        entity.setCategory(dto.getCategory());
        entity.setStatus(dto.getStatus().name());
        entity.setUpdatedAt(LocalDateTime.now());
    }
}
