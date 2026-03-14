package com.nexora.api.config;

import com.nexora.api.model.Product;
import com.nexora.api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(ProductRepository repository) {
        return args -> {
            repository.save(new Product("NXR-001", "Widget Pro 3000", "Componente principal de ensamblaje", new BigDecimal("149.99"), 250, "COMPONENTS", "ACTIVE"));
            repository.save(new Product("NXR-002", "Módulo de Control X", "Módulo de control avanzado para automatización", new BigDecimal("899.00"), 80, "MODULES", "ACTIVE"));
            repository.save(new Product("NXR-003", "Cable de Transferencia USB-C", "Cable de alta velocidad 2m", new BigDecimal("24.99"), 1500, "ACCESSORIES", "ACTIVE"));
            repository.save(new Product("NXR-004", "Panel de Visualización HD", "Pantalla de 10 pulgadas para tablero de control", new BigDecimal("349.50"), 45, "DISPLAYS", "ACTIVE"));
            repository.save(new Product("NXR-005", "Sensor de Temperatura T-200", "Sensor industrial de precisión ±0.1°C", new BigDecimal("75.00"), 2, "SENSORS", "DISCONTINUED"));
            repository.save(new Product("NXR-006", "Fuente de Poder 48V", "Alimentación industrial certificada", new BigDecimal("199.99"), 120, "POWER", "ACTIVE"));
            repository.save(new Product("NXR-007", "Kit de Instalación Básico", "Herramientas y tornillería para montaje estándar", new BigDecimal("39.99"), 300, "KITS", "INACTIVE"));
        };
    }
}
