import {Component, OnInit} from '@angular/core';

// Décorateur de composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-notre-mission',
  templateUrl: './notre-mission.component.html',
  styleUrls: ['./notre-mission.component.css']
})
export class NotreMissionComponent implements OnInit {
  carouselItems: HTMLElement[];
  currentItemIndex: number;

  // Constructeur initialisant les variables
  constructor() {
    this.currentItemIndex = 0; // Index de l'élément actuel dans le carrousel
    this.carouselItems = []; // Liste des éléments du carrousel
  }

  // Méthode exécutée après la création du composant
  ngOnInit(): void {
    // Retarder la récupération des éléments du carrousel après le rendu de la vue
    setTimeout(() => {
      // Récupérer tous les éléments de carrousel
      this.carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
      // Démarrer le carrousel
      this.startCarousel();
    }, 0);
  }

  // Méthode pour démarrer le carrousel
  startCarousel() {
    // Démarrer un intervalle pour faire défiler les éléments du carrousel toutes les 3 secondes
    setInterval(() => {
      // Retirer la classe active de l'élément du carrousel actuel
      this.carouselItems[this.currentItemIndex].classList.remove('active');
      // Passer à l'élément suivant dans le carrousel
      this.currentItemIndex = (this.currentItemIndex + 1) % this.carouselItems.length;
      // Ajouter la classe active au nouvel élément du carrousel
      this.carouselItems[this.currentItemIndex].classList.add('active');
    }, 3000);
  }
}
