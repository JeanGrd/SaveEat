import { Component } from '@angular/core';
import {EventService} from "../event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-event-details-front',
  templateUrl: './event-details-front.component.html',
  styleUrls: ['./event-details-front.component.css']
})
export class EventDetailsFrontComponent {

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  register(): void {
    this.route.params.subscribe((params) => {
      this.router.navigate(['events', params['id'], 'inscription']);
    });
  }

}
