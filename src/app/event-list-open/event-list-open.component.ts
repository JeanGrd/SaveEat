// event-list-open.component.ts
import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service'; // Import du service EventService pour interagir avec les données d'événements
import {Router} from '@angular/router'; // Import du module Router pour naviguer entre les composants
import {ChangeDetectorRef} from '@angular/core'; // Import de ChangeDetectorRef pour déclencher la détection des changements dans la vue

// Décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-list-open',
  templateUrl: './event-list-open.component.html',
  styleUrls: ['./event-list-open.component.css']
})
export class EventListOpenComponent implements OnInit {
  events: any[] = []; // Stocke la liste d'événements ouverts
  currentPage: number = 1; // Stocke la page courante de la liste
  hasMorePages: boolean = false; // Indique s'il reste des pages à charger
  searchStr: string = ''; // Stocke le terme de recherche pour filtrer les événements

  constructor(
    private eventService: EventService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  // Cette méthode est déclenchée après la création du composant par Angular
  ngOnInit(): void {
    this.fetchEvents();
  }

  // Cette méthode charge les événements ouverts de la page courante
  fetchEvents(): void {
    this.eventService.getEventsOpen(this.currentPage, this.searchStr).subscribe(data => {
      this.events = data.events;
      this.hasMorePages = (data.total > this.currentPage * 10);
      this.addIsFullPropertyToEvents();
      this.changeDetector.detectChanges();
    });
  }

  // Cette méthode ajoute la propriété isFull à chaque événement de la liste
  addIsFullPropertyToEvents(): void {
    this.events.forEach(event => {
      event.isLoading = true;
      this.eventService.isFull(event.id).subscribe(isFull => {
        event.isFull = isFull;
        event.isLoading = false;
      });
    });
  }

  // Cette méthode redirige l'utilisateur vers la page d'inscription à un événement
  register(eventId: number): void {
    this.router.navigate(['events', eventId, 'inscription']);
  }

  // Cette méthode redirige l'utilisateur vers la page de détails d'un événement
  showDetails(eventId: number): void {
    this.router.navigate(['events/', eventId]);
  }

  // Cette méthode est déclenchée lorsque l'utilisateur veut voir la page suivante de la liste d'événements ouverts
  nextPage(): void {
    this.currentPage += 1;
    this.fetchEvents();
  }

  // Cette méthode est déclenchée lorsque l'utilisateur veut voir la page précédente de la liste d'événements ouverts
  previousPage(): void {
    this.currentPage -= 1;
    this.fetchEvents();
  }

  // Cette méthode est déclenchée lorsque l'utilisateur effectue une recherche parmi les événements ouverts
  searchEvents(): void {
    this.currentPage = 1;
    this.fetchEvents();
  }
}
