// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Utilisation du service ProductService
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details-front',
  templateUrl: './event-details-front.component.html',
  styleUrls: ['./event-details-front.component.css']
})

export class EventDetailsFrontComponent implements OnInit {
  product: any; // Variable pour stocker les détails du produit
  isLoading: boolean = true; // Variable pour indiquer si les données sont en train de se charger

  constructor(
    private productService: ProductService, // Injection du service ProductService
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['productID']);
      const productId = +params['productID']; // Récupération de l'ID du produit depuis les paramètres de la route
      if (!isNaN(productId)) {
        this.productService.getProductById(productId).subscribe({
          next: (item) => {
            this.product = item; // Stockage des détails du produit
            this.isLoading = false; // Indication que le chargement est terminé
          },
          error: (error) => {
            console.error('Error fetching product details:', error);
            this.isLoading = false; // Update loading state even on error
          }
        });
      } else {
        console.error('Invalid product ID');
        this.isLoading = false; // Ensure loading state is handled in case of error
      }
    });
  }
}
