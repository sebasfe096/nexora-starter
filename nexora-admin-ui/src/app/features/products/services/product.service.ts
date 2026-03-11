import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

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
  private readonly PRODUCT_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.PRODUCTS}`;
  private readonly INVENTORY_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.INVENTORY}`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCT_URL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCT_URL}/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.PRODUCT_URL, product);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.PRODUCT_URL}/${id}`, data);
  }

  updateStock(productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(
      `${this.INVENTORY_URL}/stock-update`,
      { productId, quantity }
    );
  }

  deactivateProduct(id: number): Observable<Product> {
    return this.http.patch<Product>(
      `${this.PRODUCT_URL}/${id}/status`,
      { status: 'INACTIVE' }
    );
  }
}
