package com.nexora.api.controller;

import com.nexora.api.model.Product;
import com.nexora.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

// Sin @ControllerAdvice para manejo global de errores
// Accede directamente al Repository (sin capa de Service)
// Retorna la entidad JPA directamente (sin DTO)
// Sin paginacion
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired  // Inyeccion por campo (deberia ser por constructor)
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        // Retorna la entidad JPA directamente, sin DTO
        // Sin paginacion: carga toda la tabla en memoria
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        // .get() sin manejo de Optional: lanza NoSuchElementException con 500
        // Deberia retornar 404 cuando no existe
        return productRepository.findById(id).get();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        // Sin @Valid: acepta cualquier body sin validar
        // Validaciones manuales hardcodeadas dentro del controller
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new RuntimeException("El campo name es requerido");
        }
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("El precio debe ser mayor a cero");
        }
        if (product.getSku() == null || product.getSku().trim().isEmpty()) {
            throw new RuntimeException("El campo sku es requerido");
        }
        // Logica de negocio dentro del controller
        if (productRepository.findBySku(product.getSku()).isPresent()) {
            throw new RuntimeException("El SKU ya existe");  // Deberia ser 409 Conflict
        }

        List<String> validStatuses = Arrays.asList("ACTIVE", "INACTIVE", "DISCONTINUED");
        if (product.getStatus() == null || !validStatuses.contains(product.getStatus())) {
            product.setStatus("ACTIVE");
        }

        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product); // Retorna la entidad JPA
    }

    @PutMapping("/{id}/status")
    public Product updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // .get() sin manejo de Optional
        // Sin validacion del status recibido
        Product product = productRepository.findById(id).get();
        product.setStatus(body.get("status"));
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        // Sin verificar si existe antes de eliminar
        // Sin respuesta estructurada (retorna 200 con body vacio, deberia ser 204)
        productRepository.deleteById(id);
    }
}
