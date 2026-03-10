import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';

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
  private readonly BASE_URL     = 'https://api-gw-node2.nexora.com/v1/inventory';
  private readonly REPORTS_URL  = 'https://api-gw-node4.nexora.com/v1/reports';

  constructor(private http: HttpClient) {}

  getStockLevels(): Observable<ApiResponse<StockLevel[]>> {
    return this.http.get<ApiResponse<StockLevel[]>>(`${this.BASE_URL}/stock-levels`);
  }

  getMovements(productId: number): Observable<ApiResponse<InventoryMovement[]>> {
    return this.http.get<ApiResponse<InventoryMovement[]>>(
      `${this.BASE_URL}/movements?productId=${productId}`
    );
  }

  getLowStockReport(): Observable<ApiResponse<StockLevel[]>> {
    return this.http.get<ApiResponse<StockLevel[]>>(`${this.REPORTS_URL}/low-stock`);
  }
}
