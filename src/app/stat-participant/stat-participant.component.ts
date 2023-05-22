import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantService} from "../participant.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

// Décorateur de composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-stat-participant',
  templateUrl: './stat-participant.component.html',
  styleUrls: ['./stat-participant.component.css']
})
export class StatParticipantComponent implements OnInit, OnDestroy {
  eventId?: number; // Identifiant de l'événement
  total: any; // Total des participants
  participantDeletedSubscription!: Subscription;

  // Constructeur avec les services et modules nécessaires injectés
  constructor(private route: ActivatedRoute, private ParticipantService: ParticipantService) {
  }

  // Méthode exécutée après la création du composant
  ngOnInit(): void {
    this.getTotalParticipants();
    this.participantDeletedSubscription = this.ParticipantService.participantDeleted.subscribe(() => {
      this.getTotalParticipants();
    });
  }

  ngOnDestroy(): void {
    this.participantDeletedSubscription.unsubscribe();
  }


  // Méthode pour obtenir le total des participants
  getTotalParticipants() {
    // Obtenir les paramètres de l'URL
    this.route.params.subscribe((params) => {
      // Récupérer l'identifiant de l'événement
      this.eventId = +params['eventId'];
      // Obtenir le total des participants pour l'événement spécifié
      this.ParticipantService.getTotalParticipants(this.eventId).subscribe((total) => {
        this.total = total; // Sauvegarder le total des participants
      });
    });
  }
}
