// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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
  }
}
