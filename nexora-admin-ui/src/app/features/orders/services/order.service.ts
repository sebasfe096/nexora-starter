import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

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
  private readonly ORDER_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.ORDERS}`;
  private readonly CUSTOMER_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.CUSTOMERS}`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ORDER_URL);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.ORDER_URL}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.ORDER_URL, order);
  }

  updateOrderStatus(id: number, status: Order['status']): Observable<Order> {
    return this.http.patch<Order>(`${this.ORDER_URL}/${id}/status`, { status });
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.CUSTOMER_URL}/${customerId}/orders`
    );
  }

  cancelOrder(id: number, reason: string): Observable<Order> {
    return this.http.post<Order>(
      `${this.ORDER_URL}/${id}/cancel`,
      { reason }
    );
  }
}
