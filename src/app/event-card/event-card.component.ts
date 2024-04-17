import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router"; // Importe ActivatedRoute pour accéder aux paramètres de l'URL
import {StockService} from "../stock.service"; // Importe EventService pour récupérer les données de l'événement

// Définit le décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
// Le composant implémente l'interface OnInit, ce qui signifie qu'il doit contenir une méthode ngOnInit
export class EventCardComponent implements OnInit {
  stock: any; // Utilisez un objet pour stocker les détails de l'article en stock, pas un tableau.
  stockId?: number;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockId = +params['id']; // Assurez-vous que le nom du paramètre correspond à celui défini dans votre route.
      if (this.stockId) {
        this.stockService.getStockItem(this.stockId).subscribe((stock) => {
          this.stock = stock;
        });
      }
    });
  }
}
