import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken(); // Récupération du token d'authentification
    const currentUrl = state.url;

    if (token && !this.authService.isTokenExpired(token)) {
      // Vérification si le token existe et n'est pas expiré
      return true; // Accès autorisé
    } else {
      if (currentUrl !== '/login') {
        // Redirection vers la page de connexion si l'URL courante n'est pas '/login'
        this.router.navigate(['/login']);
      }
      return false; // Accès refusé
    }
  }
}
