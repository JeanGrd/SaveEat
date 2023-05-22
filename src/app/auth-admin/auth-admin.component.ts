import {Component} from '@angular/core';
import {AuthService} from '../auth.service'; // Importe le service d'authentification
import {Router} from '@angular/router'; // Importe le module de routage pour naviguer entre les pages

// Définit le décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.css'],
})
export class AuthAdminComponent {
  // Initialisation des variables pour le nom d'utilisateur, le mot de passe et le message d'erreur
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  // Le constructeur qui injecte le service d'authentification et le router
  constructor(private authService: AuthService, private router: Router) {
  }

  // Méthode qui est déclenchée lors de la soumission du formulaire de connexion
  onSubmit(): void {
    // Utilisation du service d'authentification pour vérifier les informations de connexion
    this.authService.checkLogin({username: this.username, password: this.password}).subscribe(
      (data) => {
        // Si la connexion est réussie, on enregistre le token et on redirige l'utilisateur vers le tableau de bord
        if (data.message === 'Logged in') {
          this.authService.setToken(data.token);
          this.router.navigate(['/dashboard']);
        }
        // Si le compte est invalide, on affiche un message d'erreur approprié
        else if (data.error === 'Invalid account') {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
        // Si une autre erreur se produit, on affiche un message d'erreur générique
        else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.';
        }
      },
      // En cas d'erreur dans la requête, on affiche également un message d'erreur générique
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.';
      }
    );
  }

}
