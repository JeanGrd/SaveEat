import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router"; // Importe ActivatedRoute pour accéder aux paramètres de l'URL
import {EventService} from "../event.service"; // Importe EventService pour récupérer les données de l'événement

// Définit le décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
// Le composant implémente l'interface OnInit, ce qui signifie qu'il doit contenir une méthode ngOnInit
export class EventCardComponent implements OnInit {
  event: any; // Définit une variable pour stocker les détails de l'événement
  eventId?: number; // Définit une variable pour stocker l'ID de l'événement

  // Le constructeur qui injecte ActivatedRoute et EventService
  constructor(private route: ActivatedRoute, private eventService: EventService) {
  }

  // La méthode ngOnInit est exécutée après la création du composant par Angular
  ngOnInit(): void {
    // On souscrit aux paramètres de l'URL
    this.route.params.subscribe((params) => {
      // On récupère l'ID de l'événement depuis les paramètres
      this.eventId = +params['eventId'];
      // On utilise EventService pour récupérer les détails de l'événement
      this.eventService.getEvent(this.eventId).subscribe((event: Event) => {
        // On stocke les détails de l'événement dans la variable event
        this.event = event;
      });
    });
  }
}
