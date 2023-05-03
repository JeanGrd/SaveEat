import {Component, Input, OnInit} from '@angular/core';
import {StatistiqueService} from "../statistique.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-stats-participants',
  templateUrl: './stats-participants.component.html',
  styleUrls: ['./stats-participants.component.css']
})
export class StatsParticipantsComponent implements OnInit {
  @Input() eventId?: number;
  total: any;
  constructor(private Service: StatistiqueService) {}

  ngOnInit(): void {
    this.getTotalParticipants();
    setInterval(() => {
      this.getTotalParticipants();
    }, 500);
  }


  getTotalParticipants() {
    this.Service.getTotalParticipants(this.eventId!).subscribe((total) => {
      this.total = total;
    });
  }


}
