import {Component, OnInit} from '@angular/core';
import {ParticipantService} from "../participant.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stat-participant',
  templateUrl: './stat-participant.component.html',
  styleUrls: ['./stat-participant.component.css']
})
export class StatParticipantComponent implements OnInit {
  eventId?: number;
  total: any;
  constructor(private route: ActivatedRoute, private ParticipantService: ParticipantService) {}

  ngOnInit(): void {
    this.getTotalParticipants();
    setInterval(() => {
      this.getTotalParticipants();
    }, 500);
  }

  getTotalParticipants() {
    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
      this.ParticipantService.getTotalParticipants(this.eventId).subscribe((total) => {
        this.total = total;
      });
    });
  }
}
