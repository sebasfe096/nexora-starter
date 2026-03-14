package com.nexora.api.controller;

import com.nexora.api.dto.request.ProductRequestDTO;
import com.nexora.api.dto.response.ProductResponseDTO;
import com.nexora.api.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor()
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ProductResponseDTO createProduct(@RequestBody @Valid ProductRequestDTO product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}/status")
    public ProductResponseDTO updateStatus(@PathVariable Long id, @RequestBody @Valid ProductRequestDTO requestDTO) {
        return productService.updateProduct(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}
