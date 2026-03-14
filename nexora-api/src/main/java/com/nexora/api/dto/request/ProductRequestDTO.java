package com.nexora.api.dto.request;

import com.nexora.api.enums.ProductStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {

    @NotBlank(message = "El sku es obligatorio")
    private String sku;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100)
    private String name;

    @Size(max = 500)
    @NotBlank(message = "La descripcion es obligatoria")
    private String description;

    @NotNull(message = "el precio es obligatorio")
    @Min(1)
    private BigDecimal price;

    @Min(1)
    private Integer stock;

    @NotBlank(message = "la categoria es obligatorio")
    private String category;

    @NotNull(message = "El estado es obligatorio")
    private ProductStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
