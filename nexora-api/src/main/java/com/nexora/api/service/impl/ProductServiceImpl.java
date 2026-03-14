package com.nexora.api.service.impl;

import com.nexora.api.dto.request.ProductRequestDTO;
import com.nexora.api.dto.response.ProductResponseDTO;
import com.nexora.api.handler.BusinessException;
import com.nexora.api.mapper.ProductMapper;
import com.nexora.api.model.Product;
import com.nexora.api.repository.ProductRepository;
import com.nexora.api.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor()
@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        log.info("Action=GET_ALL_PRODUCTS, Status=INITIATED");
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            log.warn("Action=GET_ALL_PRODUCTS, Status=FAILED, Reason=EMPTY_INVENTORY, Threshold=CRITICAL");
            throw new BusinessException("No hay productos en el stock", HttpStatus.NOT_FOUND);
        }

        log.info("Action=GET_ALL_PRODUCTS, Status=SUCCESS, ResultCount={}", products.size());
        return productMapper.toResponseDTOList(products);
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        log.info("Action=GET_PRODUCT_BY_ID, Status=INITIATED, ID={}", id);

        return productRepository.findById(id)
                .map(productMapper::toResponseDTO)
                .orElseThrow(() -> {
                    log.warn("Action=GET_PRODUCT_BY_ID, Status=FAILED, Reason=NOT_FOUND, ID={}", id);
                    return new BusinessException("Producto no encontrado con el id: " + id, HttpStatus.NOT_FOUND);
                });
    }

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
            log.info("Action=CREATE_PRODUCT, Status=INITIATED RequestDTO={}", productRequestDTO);

        if (productRepository.findBySku(productRequestDTO.getSku()).isPresent()) {
            log.warn("Action=GET_PRODUCT_BY_ID, Status=FAILED, Reason=CONFLICT, SKU={}", productRequestDTO.getSku());
            throw new BusinessException("El product ya existe con el sku: " + productRequestDTO.getSku(), HttpStatus.CONFLICT);
        }

        return saveProduct(productRequestDTO);
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO productRequestDTO) {
        log.info("Action=UPDATE_PRODUCT, Status=INITIATED, RequestDTO={}", productRequestDTO);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Action=UPDATE_PRODUCT, Status=FAILED, Reason=NOT_FOUND, ID={}", id);
                    return new BusinessException("Producto no encontrado con ID: " + id, HttpStatus.NOT_FOUND);
                });

        productMapper.updateEntityFromDTO(productRequestDTO, product);

        Product updatedProduct = productRepository.save(product);

        log.info("Action=UPDATE_PRODUCT, Status=SUCCESS, ID={}", id);
        return productMapper.toResponseDTO(updatedProduct);
    }

    @Override
    @Transactional
    public void deleteProductById(Long id) {
        log.info("Action=DELETE_PRODUCT_BY_ID, Status=INITIATED, ID={}", id);
        if (!productRepository.existsById(id)) {
            log.warn("Action=DELETE_PRODUCT, Status=FAILED, Reason=NOT_FOUND, ID={}", id);
            throw new BusinessException("No se puede eliminar, producto no encontrado con ID: " + id, HttpStatus.NOT_FOUND);
        }
        productRepository.deleteById(id);
        log.info("Action=DELETE_PRODUCT_BY_ID, Status=SUCCESS, ID={}", id);
    }


    public ProductResponseDTO saveProduct(ProductRequestDTO productRequestDTO) {
        log.info("Action=SAVE_PRODUCT, Status=INITIATED");
        Product product = productMapper.toEntity(productRequestDTO);

        product = productRepository.save(product);

        log.info("Action=SAVE_PRODUCT, Status=SUCCESS, ID={}", product.getId());

        return productMapper.toResponseDTO(product);
    }

}
