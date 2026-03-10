import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../../../core/models/api-response.model';

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly BASE_URL      = 'https://api-gw-node1.nexora.com/v1/products';
  private readonly INVENTORY_URL = 'https://api-gw-node2.nexora.com/v1/inventory';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(this.BASE_URL);
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.BASE_URL, product);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.BASE_URL}/${id}`, data);
  }

  updateStock(productId: number, quantity: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${this.INVENTORY_URL}/stock-update`,
      { productId, quantity }
    );
  }

  deactivateProduct(id: number): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(
      `${this.BASE_URL}/${id}/status`,
      { status: 'INACTIVE' }
    );
  }
}
