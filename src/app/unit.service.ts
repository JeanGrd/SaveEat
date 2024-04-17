// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apiUrl = 'http://localhost:3001/units'; // API URL for units

  constructor(private http: HttpClient) {}

  // Get all units
  getAllUnits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single unit by its ID
  getUnitById(unitId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${unitId}`);
  }

  // Create a new unit
  createUnit(unitData: any): Observable<any> {
    return this.http.post(this.apiUrl, unitData);
  }

  // Update an existing unit
  updateUnit(unitId: number, unitData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${unitId}`, unitData);
  }

  // Delete a unit
  deleteUnit(unitId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${unitId}`);
  }
}
