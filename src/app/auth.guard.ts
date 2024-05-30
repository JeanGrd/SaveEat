import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Retourne toujours vrai pour simplifier le développement
    return true;

    // Vous pourriez commenter ou supprimer le reste du code qui vérifie le token
    /*
    const token = this.authService.getToken();
    const currentUrl = state.url;

    if (token && !this.authService.isTokenExpired(token)) {
      return true;
    } else {
      if (currentUrl !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }
    */
  }
}
