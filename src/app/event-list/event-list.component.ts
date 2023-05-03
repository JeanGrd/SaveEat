// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  create(): void {
    this.router.navigate(['/events/create']);
  }

  showDetails(eventId: number): void {
    this.router.navigate(['/event-details', eventId]);
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        // Mettre à jour la liste des événements en filtrant l'événement supprimé
        this.events = this.events.filter(event => event.id !== eventId);

        // Afficher le message de réussite
        this.messageService.showMessage('Événement supprimé avec succès !', 'success');
      },
      error => {
        // Gérer les erreurs lors de la suppression de l'événement
        console.error('Erreur lors de la suppression de l\'événement:', error);

        // Afficher le message d'erreur
        this.messageService.showMessage('Erreur lors de la suppression de l\'événement.', 'error');
      }
    );
  }
}
