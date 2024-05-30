// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3001/statistics'; // API URL for statistics

  constructor(private http: HttpClient) {}

  // Get the total number of units in stock for each product
  getTotalUnitsInStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/units-in-stock`);
  }

  // Get products that are expiring soon
  getProductsExpiringSoon(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expiring-soon`);
  }

  // Get activity of suppliers (number of units supplied by each supplier)
  getSupplierActivity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/supplier-activity`);
  }

  getQuantityByProductId(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}/quantity`);
  }

}
