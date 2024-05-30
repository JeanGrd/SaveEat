import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../product.service"; // Change to import ProductService

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  product: any; // Changed from 'stock' to 'product'
  productId?: number; // Changed from 'stockId' to 'productId'

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService // Changed from StockService to ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['productID'];
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
  }
}
