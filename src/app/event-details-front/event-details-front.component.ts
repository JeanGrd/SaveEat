// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service'; // Utilisation du service StockItemService
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details-front',
  templateUrl: './event-details-front.component.html',
  styleUrls: ['./event-details-front.component.css']
})

export class EventDetailsFrontComponent implements OnInit {
  stockItem: any; // Variable pour stocker les détails de l'article en stock
  isLoading: boolean = true; // Variable pour indiquer si les données sont en train de se charger

  constructor(
    private stockItemService: StockService, // Injection du service StockItemService
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['productID']; // Récupération de l'ID du produit depuis les paramètres de la route
      this.stockItemService.getStockItem(productId).subscribe(item => {
        this.stockItem = item; // Stockage des détails de l'article en stock
        this.isLoading = false; // Indication que le chargement est terminé
      });
    });
  }

}
