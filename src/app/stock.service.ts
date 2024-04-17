import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stockItemDeleted = new Subject<void>(); // Événement déclenché lors de la suppression d'un article en stock
  private apiUrl = 'http://localhost:3001/stock-items';

  constructor(private http: HttpClient) { }

  // Récupère la liste des articles en stock avec pagination et recherche
  getStockItems(page: number, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&search=${searchTerm}`);
  }

  // Récupère les détails d'un article en stock spécifique
  getStockItem(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }

  // Supprime un article en stock spécifique
  deleteStockItem(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.stockItemDeleted.next(); // Émet un événement de suppression d'article en stock
      })
    );
  }

  // Crée un nouvel article en stock
  createStockItem(stockItemData: any): Observable<any> {
    return this.http.post(this.apiUrl, stockItemData);
  }

  // Met à jour un article en stock
  updateStockItem(productId: number, stockItemData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put(url, stockItemData);
  }

  // Récupère le total des stocks
  getTotalStock(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total/stock`);
  }

  // Récupère le nombre total d'articles en stock
  getTotalItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total/items`);
  }
}
