import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notre-mission',
  templateUrl: './notre-mission.component.html',
  styleUrls: ['./notre-mission.component.css']
})
export class NotreMissionComponent implements OnInit {
  carouselItems: HTMLElement[];
  currentItemIndex: number;

  constructor() {
    this.currentItemIndex = 0;
    this.carouselItems = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
      this.startCarousel();
    }, 0);
  }

  startCarousel() {
    setInterval(() => {
      this.carouselItems[this.currentItemIndex].classList.remove('active');
      this.currentItemIndex = (this.currentItemIndex + 1) % this.carouselItems.length;
      this.carouselItems[this.currentItemIndex].classList.add('active');
    }, 3000);
  }
}
