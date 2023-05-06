// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list-open',
  templateUrl: './event-list-open.component.html',
  styleUrls: ['./event-list-open.component.css']
})
export class EventListOpenComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventService.getEventsOpen().subscribe(data => {
      this.events = data;
      this.addIsFullPropertyToEvents();
    });
  }

  addIsFullPropertyToEvents(): void {
    this.events.forEach(event => {
      event.isLoading = true; // Ajoutez cette ligne
      this.eventService.isFull(event.id).subscribe(isFull => {
        event.isFull = isFull;
        event.isLoading = false; // Ajoutez cette ligne
      });
    });
  }

  register(eventId: number): void {
    this.router.navigate(['events', eventId, 'inscription']);
  }

  showDetails(eventId: number): void {
    this.router.navigate(['events/', eventId]);
  }
}
