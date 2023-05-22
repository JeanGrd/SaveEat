import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../event.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  event: any;
  eventId?: number;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
      this.eventService.getEvent(this.eventId).subscribe((event: Event) => {
        this.event = event;
      });
    });
  }
}
