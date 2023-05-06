// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  currentPage: number = 1;
  hasMoreEvents: boolean = true;


  constructor(
    private eventService: EventService,
    private router: Router,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents(this.currentPage).subscribe(data => {
      this.events = data.events;
      this.hasMoreEvents = data.total > this.currentPage * 10;
      this.changeDetector.detectChanges();
    });
  }

  create(): void {
    this.router.navigate(['/dashboard/create']);
  }

  showDetails(eventId: number): void {
    this.router.navigate(['/dashboard/event-details', eventId]);
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

  nextPage(): void {
    this.currentPage += 1;
    this.loadEvents();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadEvents();
    }
  }
}
