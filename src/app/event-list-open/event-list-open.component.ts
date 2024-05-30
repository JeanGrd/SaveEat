import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { StatisticsService } from '../statistics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list-open',
  templateUrl: './event-list-open.component.html',
  styleUrls: ['./event-list-open.component.css']
})
export class EventListOpenComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  hasMorePages: boolean = false;
  searchStr: string = '';

  constructor(
    private productService: ProductService,
    private statisticsService: StatisticsService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
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
    this.router.navigate(['/products', productId]);
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
