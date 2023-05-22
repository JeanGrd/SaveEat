import { Component, OnInit } from '@angular/core';
import {EventService} from "../event.service";
import {ParticipantService} from "../participant.service";

@Component({
  selector: 'app-stat-general',
  templateUrl: './stat-general.component.html',
  styleUrls: ['./stat-general.component.css']
})
export class StatGeneralComponent implements OnInit {
  total: any;
  average: any;

  constructor(private EventService: EventService, private ParticipantService: ParticipantService) {}

  ngOnInit(): void {
    this.getGeneralStats();
    setInterval(() => {
      this.getGeneralStats();
    }, 500);
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
