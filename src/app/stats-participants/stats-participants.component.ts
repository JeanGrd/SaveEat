import {Component, Input, OnInit} from '@angular/core';
import {StatistiqueService} from "../statistique.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stats-participants',
  templateUrl: './stats-participants.component.html',
  styleUrls: ['./stats-participants.component.css']
})
export class StatsParticipantsComponent implements OnInit {
  eventId?: number;
  total: any;
  constructor(private route: ActivatedRoute, private Service: StatistiqueService) {}

  ngOnInit(): void {
    this.getTotalParticipants();
    setInterval(() => {
      this.getTotalParticipants();
    }, 500);
  }

  getTotalParticipants() {
    this.route.params.subscribe((params) => {
      this.eventId = +params['id'];
      this.Service.getTotalParticipants(this.eventId).subscribe((total) => {
        this.total = total;
      });
    });
  }
}
