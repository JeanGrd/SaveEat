// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/products'; // API URL for products

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single product by its ID
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  // Create a new product
  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  // Update an existing product
  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, productData);
  }

  // Delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  getCategoryById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}/categoryId`);
  }
}
