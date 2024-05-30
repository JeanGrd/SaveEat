import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { UnitService } from "../unit.service";
import { SupplierService } from "../supplier.service";

interface UnitData {
  productId: number;
  supplierName: string;
  expirationDate: string;
  purchasePrice: number;
  salePrice: number;
  brand: string;
  description: string;
}

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent implements OnInit {
  productId: number | undefined;
  suppliers: any[] = []; // Array to hold supplier names

  constructor(
    private unitService: UnitService,
    private supplierService: SupplierService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['productID']; // Récupérer le productId de l'URL
    });
    this.loadSuppliers(); // Charger la liste des fournisseurs
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe(
      suppliers => {
        this.suppliers = suppliers;
      },
      error => {
        console.error('Erreur lors du chargement des fournisseurs:', error);
      }
    );
    console.log(this.supplierService.getAllSuppliers());
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.productId) {
      const unitData: UnitData = {
        productId: this.productId,
        supplierName: form.value.supplierName,
        expirationDate: form.value.expirationDate,
        purchasePrice: form.value.purchasePrice,
        salePrice: form.value.salePrice,
        brand: form.value.brand,
        description: form.value.description,
      };

      const quantity = form.value.quantity;

      for (let i = 0; i < quantity; i++) {
        this.unitService.createUnit(unitData).subscribe(
          (response) => {
            this.messageService.showMessage('Unité(s) créé avec succès !');
          },
          (error) => {
            this.messageService.showMessage('Erreur lors de la création.');
          }
        );
      }
      this.router.navigate(['/dashboard/product', this.productId]);
      this.location.replaceState('/dashboard/product');
    }
  }
}
