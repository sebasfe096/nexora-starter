import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.BASE_URL);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.BASE_URL}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.BASE_URL, order);
  }

  updateOrderStatus(id: number, status: Order['status']): Observable<Order> {
    return this.http.patch<Order>(`${this.BASE_URL}/${id}/status`, { status });
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.CUSTOMER_URL}/${customerId}/orders`
    );
  }

  cancelOrder(id: number, reason: string): Observable<Order> {
    return this.http.post<Order>(
      `${this.BASE_URL}/${id}/cancel`,
      { reason }
    );
  }
}
