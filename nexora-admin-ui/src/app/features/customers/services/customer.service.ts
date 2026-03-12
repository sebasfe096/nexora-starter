import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  status: 'ACTIVE' | 'INACTIVE';
  totalOrders?: number;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly BASE_URL = 'https://api-gw-node3.nexora.com/v1/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(this.BASE_URL);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.BASE_URL}/${id}`);
  }

  updateCustomerTier(id: number, tier: Customer['tier']): Observable<Customer> {
    return this.http.patch<Customer>(`${this.BASE_URL}/${id}/tier`, { tier });
  }

  searchCustomers(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}/search?q=${query}`);
  }
}
