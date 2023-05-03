// event.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = 'http://localhost:3001/stats';

  constructor(private http: HttpClient) { }

  getTotalEvent(): Observable<any> {
    return this.http.get(this.apiUrl + "/total");
  }

  getAverageParticipants(): Observable<any> {
    return this.http.get(this.apiUrl + "/average");
  }

  getTotalParticipants(eventId: number): Observable<any> {
    return this.http.get(this.apiUrl+`/${eventId}/total`);
  }
}
