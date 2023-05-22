// event-list.component.ts
import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service'; // Import du service EventService pour interagir avec les données d'événements
import {Router} from '@angular/router'; // Import du module Router pour naviguer entre les composants
import {MessageService} from '../message.service'; // Import du service MessageService pour afficher des messages
import {ChangeDetectorRef} from '@angular/core'; // Import de ChangeDetectorRef pour déclencher la détection des changements dans la vue

// Décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-list-all',
  templateUrl: './event-list-all.component.html',
  styleUrls: ['./event-list-all.component.css']
})
export class EventListAllComponent implements OnInit {
  events: any[] = []; // Stocke la liste d'événements
  currentPage: number = 1; // Stocke la page courante de la liste
  hasMoreEvents: boolean = true; // Indique s'il reste des événements à charger
  searchTerm: string = ''; // Stocke le terme de recherche pour filtrer les événements

  constructor(
    private eventService: EventService,
    private router: Router,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  // Cette méthode est déclenchée après la création du composant par Angular
  ngOnInit(): void {
    this.loadEvents();
  }

  // Cette méthode charge les événements de la page courante
  loadEvents(): void {
    this.eventService.getEvents(this.currentPage, this.searchTerm).subscribe(data => {
      this.hasMoreEvents = data.total > this.currentPage * 10;
      this.events = data.events;
      this.changeDetector.detectChanges();
    });
  }

  // Cette méthode est déclenchée lorsque l'utilisateur effectue une recherche
  onSearch(): void {
    this.currentPage = 1;
    this.loadEvents();
  }

  // Cette méthode redirige l'utilisateur vers la page de création d'un événement
  create(): void {
    this.router.navigate(['/dashboard/create']);
  }

  // Cette méthode redirige l'utilisateur vers la page de détails d'un événement
  showDetails(eventId: number): void {
    this.router.navigate(['/dashboard/', eventId]);
  }

  // Cette méthode supprime un événement et met à jour la liste des événements
  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        this.events = this.events.filter(event => event.id !== eventId);
        this.messageService.showMessage('Événement supprimé avec succès !', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression de l\'événement:', error);
        this.messageService.showMessage('Erreur lors de la suppression de l\'événement.', 'error');
      }
    );
  }

  // Cette méthode est déclenchée lorsque l'utilisateur veut voir la page suivante de la liste d'événements
  nextPage(): void {
    this.currentPage += 1;
    this.loadEvents();
  }

  // Cette méthode est déclenchée lorsque l'utilisateur veut voir la page précédente de la liste d'événements
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadEvents();
    }
  }
}
