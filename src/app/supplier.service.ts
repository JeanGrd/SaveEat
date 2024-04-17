// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:3001/suppliers'; // API URL for suppliers

  constructor(private http: HttpClient) {}

  // Get all suppliers
  getAllSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single supplier by its ID
  getSupplierById(supplierId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${supplierId}`);
  }

  // Create a new supplier
  createSupplier(supplierData: any): Observable<any> {
    return this.http.post(this.apiUrl, supplierData);
  }

  // Update an existing supplier
  updateSupplier(supplierId: number, supplierData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${supplierId}`, supplierData);
  }

  // Delete a supplier
  deleteSupplier(supplierId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${supplierId}`);
  }
}
