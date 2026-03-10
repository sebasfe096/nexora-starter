import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../../../core/models/api-response.model';

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly BASE_URL     = 'https://api-gw-node2.nexora.com/v1/orders';
  private readonly CUSTOMER_URL = 'https://api-gw-node3.nexora.com/v1/customers';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<PaginatedResponse<Order>> {
    return this.http.get<PaginatedResponse<Order>>(this.BASE_URL);
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.BASE_URL}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(this.BASE_URL, order);
  }

  updateOrderStatus(id: number, status: Order['status']): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${this.BASE_URL}/${id}/status`, { status });
  }

  getOrdersByCustomer(customerId: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(
      `${this.CUSTOMER_URL}/${customerId}/orders`
    );
  }

  cancelOrder(id: number, reason: string): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(
      `${this.BASE_URL}/${id}/cancel`,
      { reason }
    );
  }
}
