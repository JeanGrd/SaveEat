import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticsService } from "../statistics.service";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-stat-general',
  templateUrl: './stat-general.component.html',
  styleUrls: ['./stat-general.component.css']
})
export class StatGeneralComponent implements OnInit, OnDestroy {
  total: any;
  private statisticsSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.getGeneralStats();
  }

  ngOnDestroy(): void {
    // Vérifiez si l'abonnement est actif avant de désabonner
    if (this.statisticsSubscription) {
      this.statisticsSubscription.unsubscribe();
    }
  }

  getGeneralStats(): void {
    this.statisticsSubscription = this.statisticsService.getTotalUnitsInStock().subscribe((stock_count) => {
      this.total = stock_count;
    });
  }
}
