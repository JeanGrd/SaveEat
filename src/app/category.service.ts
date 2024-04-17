// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3001/categories'; // API URL for categories

  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single category by its ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`);
  }

  // Create a new category
  createCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData);
  }

  // Update an existing category
  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, categoryData);
  }

  // Delete a category
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }
}
