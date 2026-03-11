import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.BASE_URL}/${id}`, data);
  }

  updateStock(productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(
      `${this.INVENTORY_URL}/stock-update`,
      { productId, quantity }
    );
  }

  deactivateProduct(id: number): Observable<Product> {
    return this.http.patch<Product>(
      `${this.BASE_URL}/${id}/status`,
      { status: 'INACTIVE' }
    );
  }
}
