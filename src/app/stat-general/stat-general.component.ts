// stat-general.component.ts
import {Component, OnInit, OnDestroy} from '@angular/core';
import {EventService} from "../event.service";
import {ParticipantService} from "../participant.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stat-general',
  templateUrl: './stat-general.component.html',
  styleUrls: ['./stat-general.component.css']
})
export class StatGeneralComponent implements OnInit, OnDestroy {
  total: any;
  average: any;
  eventDeletedSubscription!: Subscription;

  constructor(
    private EventService: EventService,
    private ParticipantService: ParticipantService
  ) {
  }

  ngOnInit(): void {
    this.getGeneralStats();
    this.eventDeletedSubscription = this.EventService.eventDeleted.subscribe(() => {
      this.getGeneralStats();
    });
  }

  ngOnDestroy(): void {
    this.eventDeletedSubscription.unsubscribe();
  }

  getGeneralStats(): void {
    this.EventService.getTotalEvent().subscribe((event_count) => {
      this.total = event_count;
    });
    this.ParticipantService.getAverageParticipants().subscribe((average) => {
      this.average = average;
    });
  }
}
