// event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  register(eventId: number): void {
    this.router.navigate(['/dashboard/event-details', eventId]);
  }

  showDetails(eventId: number): void {
    this.router.navigate(['/dashboard/event-details', eventId]);
  }

}
