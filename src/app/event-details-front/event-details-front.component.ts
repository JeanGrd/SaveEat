import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details-front',
  templateUrl: './event-details-front.component.html',
  styleUrls: ['./event-details-front.component.css']
})
export class EventDetailsFrontComponent {
  eventFull: boolean = false;
  isLoading: boolean = true; // Ajoutez cette ligne

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const eventId = params['id'];
      this.eventService.getEvent(eventId).subscribe((event) => {
        this.eventService.isFull(eventId).subscribe((isFull) => {
          this.eventFull = isFull;
          this.isLoading = false; // Ajoutez cette ligne
        });
      });
    });
  }

  register(): void {
    this.route.params.subscribe((params) => {
      this.router.navigate(['events', params['id'], 'inscription']);
    });
  }
}
