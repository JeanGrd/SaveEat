// Importation des modules nécessaires
import {Component} from '@angular/core'; // Importe le décorateur de Component d'Angular
import {EventService} from '../event.service'; // Importe le service EventService pour l'accès aux données des événements
import {ActivatedRoute, Router} from '@angular/router'; // Importe ActivatedRoute et Router pour la gestion des routes

@Component({
  selector: 'app-event-details-front',
  templateUrl: './event-details-front.component.html',
  styleUrls: ['./event-details-front.component.css']
})
export class EventDetailsFrontComponent {
  eventFull: boolean = false; // Une variable qui indique si l'événement est complet
  isLoading: boolean = true; // Une variable qui indique si les données de l'événement sont en train de se charger

  // Le constructeur du composant, qui injecte les services et modules nécessaires
  constructor(
    private eventService: EventService, // Le service pour accéder aux données des événements
    private route: ActivatedRoute, // Le module pour accéder aux paramètres de la route actuelle
    private router: Router, // Le module pour naviguer entre les routes
  ) {
  }

  // La méthode ngOnInit est appelée automatiquement par Angular après la création du composant
  ngOnInit(): void {
    // On souscrit aux paramètres de la route
    this.route.params.subscribe((params) => {
      const eventId = params['eventId']; // On récupère l'ID de l'événement depuis les paramètres de la route
      // On récupère les données de l'événement
      this.eventService.getEvent(eventId).subscribe((event) => {
        // On vérifie si l'événement est complet
        this.eventService.isFull(eventId).subscribe((isFull) => {
          this.eventFull = isFull; // On met à jour la variable eventFull
          this.isLoading = false; // On indique que le chargement est terminé
        });
      });
    });
  }

  // La méthode qui est appelée lorsque l'utilisateur veut s'inscrire à l'événement
  register(): void {
    // On souscrit aux paramètres de la route
    this.route.params.subscribe((params) => {
      // On navigue vers la page d'inscription pour cet événement
      this.router.navigate(['events', params['eventId'], 'inscription']);
    });
  }
}
