import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from "../statistique.service";

@Component({
  selector: 'app-generalstat',
  templateUrl: './generalstat.component.html',
  styleUrls: ['./generalstat.component.css']
})
export class GeneralstatComponent implements OnInit {
  total: any;
  average: any;

  constructor(private Service: StatistiqueService) {}

  ngOnInit(): void {
    this.getGeneralStats();
    setInterval(() => {
      this.getGeneralStats();
    }, 500); // Mettez à jour toutes les 5 secondes
  }

  getGeneralStats(): void {
    this.Service.getTotalEvent().subscribe((total) => {
      this.total = total;
    });
    this.Service.getAverageParticipants().subscribe((average) => {
      this.average = average;
    });
  }
}
