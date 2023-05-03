import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Importez AuthService
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.css'],
})
export class AuthAdminComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  } // Injectez AuthService et Router

  onSubmit(): void {
    this.authService.checkLogin({ username: this.username, password: this.password }).subscribe(
      (data) => {
        if (data.message === 'Logged in') {
          this.authService.setToken(data.token);
          this.router.navigate(['/events']);
        } else if (data.error === 'Invalid account') {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.';
        }
      },
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.';
      }
    );
  }

}
