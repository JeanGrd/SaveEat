import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "../message.service";
import { UnitService } from "../unit.service";

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css']
})
export class UnitsListComponent {
  products: any[] = [];  // Array to hold products
  currentPage: number = 1;
  hasMorePages: boolean = false;
  searchStr: string = '';
  product: any; // Changed from 'stock' to 'product'
  productId?: number; // Changed from 'stockId' to 'productId'

  constructor(
    private unitService: UnitService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private changeDetector: ChangeDetectorRef // Add ChangeDetectorRef
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
    this.fetchProductsAndQuantities();
  }

  fetchProductsAndQuantities(): void {
    this.unitService.getAllByProduct(this.productId).subscribe(products => {
      this.products = products; // Assuming the API returns an array of products
    });
  }

  showDetails(productId: number): void {
    this.router.navigate(['/dashboard/product', productId]);
  }

  delete(unitId: number): void {
    console.log(unitId);
    this.unitService.deleteUnit(unitId).subscribe(
      () => {
        this.products = this.products.filter(product => product.UNIT_ID !== unitId);
        this.changeDetector.detectChanges(); // Force Angular to detect changes
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
