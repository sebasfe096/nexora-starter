package com.nexora.api;

import com.nexora.api.dto.response.ProductResponseDTO;
import com.nexora.api.handler.BusinessException;
import com.nexora.api.mapper.ProductMapper;
import com.nexora.api.model.Product;
import com.nexora.api.repository.ProductRepository;
import com.nexora.api.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;



@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product();
        product.setId(1L);
        product.setName("Test Product");
    }

    @Test
    @DisplayName("getAllProducts - Debe retornar lista cuando existen productos")
    void getAllProducts_Success() {
        List<Product> productList = List.of(product);
        when(productRepository.findAll()).thenReturn(productList);
        when(productMapper.toResponseDTOList(productList)).thenReturn(List.of(new ProductResponseDTO()));

        List<ProductResponseDTO> response = productService.getAllProducts();

        assertNotNull(response);
        assertEquals(1, response.size());
        verify(productRepository, times(1)).findAll();
        verify(productMapper, times(1)).toResponseDTOList(productList);
    }

    @Test
    @DisplayName("getAllProducts - Debe lanzar BusinessException cuando no hay productos")
    void getAllProducts_Empty_ThrowsException() {
        when(productRepository.findAll()).thenReturn(Collections.emptyList());

        BusinessException exception = assertThrows(BusinessException.class, () -> {
            productService.getAllProducts();
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getHttpStatus());
        verify(productMapper, never()).toResponseDTOList(any());
    }

    @Test
    @DisplayName("getProductById - Debe retornar producto cuando existe")
    void getProductById_Success() {
        Long id = 1L;
        when(productRepository.findById(id)).thenReturn(Optional.of(product));
        when(productMapper.toResponseDTO(product)).thenReturn(new ProductResponseDTO());

        ProductResponseDTO response = productService.getProductById(id);

        assertNotNull(response);
        verify(productRepository, times(1)).findById(id);
    }

    @Test
    @DisplayName("getProductById - Debe lanzar BusinessException cuando no existe")
    void getProductById_NotFound_ThrowsException() {
        Long id = 99L;
        when(productRepository.findById(id)).thenReturn(Optional.empty());

        BusinessException exception = assertThrows(BusinessException.class, () -> {
            productService.getProductById(id);
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getHttpStatus());
        verify(productMapper, never()).toResponseDTO(any());
    }
}
