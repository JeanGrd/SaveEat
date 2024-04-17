// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3001/transactions'; // API URL for transactions

  constructor(private http: HttpClient) {}

  // Get all transactions
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single transaction by its ID
  getTransactionById(transactionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${transactionId}`);
  }

  // Create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.apiUrl, transactionData);
  }

  // Update an existing transaction
  updateTransaction(transactionId: number, transactionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}`, transactionData);
  }

  // Delete a transaction
  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${transactionId}`);
  }
}
