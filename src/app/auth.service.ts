import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import jwt_decode from 'jwt-decode'; // Importation du module jwt-decode pour décoder le token JWT

interface DecodedToken {
  exp: number; // Propriété "exp" du token JWT pour la date d'expiration
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) { }

  // Vérifie les informations de connexion
  checkLogin(login: any): Observable<any> {
    return of({
      token: 'fake-jwt-token', // Token JWT factice
      message: 'Logged in' // Message de connexion réussie
    });

    // this.http.post(this.apiUrl + `/login`, login);
  }

  // Définit le token dans le stockage local
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupère le token depuis le stockage local
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Vérifie si le token est expiré
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt_decode(token) as DecodedToken; // Décodage du token JWT
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime; // Vérification de la date d'expiration
    } catch (err) {
      return false; // En cas d'erreur, considéré comme non expiré
    }
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token'); // Suppression du token du stockage local
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true; // Connecté si le token existe et n'est pas expiré
    } else {
      return false; // Non connecté
    }
  }
}
