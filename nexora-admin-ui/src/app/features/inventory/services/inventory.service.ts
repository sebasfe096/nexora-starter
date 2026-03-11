import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

export interface InventoryMovement {
  id: number;
  productId: number;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason: string;
  createdAt: string;
}

export interface StockLevel {
  productId: number;
  sku: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly INVENTORY_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.ORDERS}`;
  private readonly REPORTS_URL = `${environment.API_DOMAIN}${environment.API_CONTEXT}${environment.SERVICES.REPORTS}`;

  constructor(private http: HttpClient) {}

  getStockLevels(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.INVENTORY_URL}/stock-levels`);
  }

  getMovements(productId: number): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(
      `${this.INVENTORY_URL}/movements?productId=${productId}`
    );
  }

  getLowStockReport(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.REPORTS_URL}/low-stock`);
  }
}
