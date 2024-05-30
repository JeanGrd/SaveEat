import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-event-details-back',
  templateUrl: './event-details-back.component.html',
  styleUrls: ['./event-details-back.component.css']
})
export class EventDetailsBackComponent {

  product: any; // Changed from 'stock' to 'product'
  productId?: number; // Changed from 'stockId' to 'productId'

  constructor(
    private router: Router,
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

  create(): void {
    this.router.navigate(['dashboard/product/' + this.productId + '/create']);
  }
}
