import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import {StatisticsService} from "../statistics.service";

// Décorateur du composant avec son sélecteur, son modèle de vue et sa feuille de style
@Component({
  selector: 'app-event-list-all',
  templateUrl: './event-list-all.component.html',
  styleUrls: ['./event-list-all.component.css']
})
export class EventListAllComponent implements OnInit {
  products: any[] = [];  // Array to hold products
  currentPage: number = 1;
  hasMorePages: boolean = false;
  searchStr: string = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private statisticsService: StatisticsService,

  ) {}

  ngOnInit(): void {
    this.fetchProductsAndQuantities();
  }

  fetchProductsAndQuantities(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products; // Assuming the API returns an array of products
      this.products.forEach(product => {
        this.statisticsService.getQuantityByProductId(product.PRODUCT_ID).subscribe(quantity => {
          product.quantity = quantity.quantity;
          this.changeDetector.detectChanges();
        });
      });
    });
  }

  showDetails(productId: number): void {
    this.router.navigate(['/dashboard/product', productId]);
  }

  delete(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== productId);
        this.messageService.showMessage('Produit supprimé avec succès !', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression du produit:', error);
        this.messageService.showMessage('Erreur lors de la suppression du produit.', 'error');
      }
    );
  }

  nextPage(): void {
    this.currentPage += 1;
    this.fetchProductsAndQuantities();
  }

  previousPage(): void {
    this.currentPage -= 1;
    this.fetchProductsAndQuantities();
  }

  searchProducts(): void {
    this.currentPage = 1;
    this.fetchProductsAndQuantities();
  }
}
