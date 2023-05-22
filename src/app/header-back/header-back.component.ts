import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

// Décorateur de composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.css'],
})
export class HeaderBackComponent {
  // Injecter le service d'authentification et le router dans le constructeur
  constructor(private authService: AuthService, private router: Router) {
  }

  // Méthode pour se déconnecter
  onLogout(): void {
    // Appeler la méthode de déconnexion du service d'authentification
    this.authService.logout();
    // Rediriger l'utilisateur vers la page d'accueil
    this.router.navigate(['/']);
  }
}
