import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-event-list-open',
  templateUrl: './event-list-open.component.html',
  styleUrls: ['./event-list-open.component.css']
})
export class EventListOpenComponent implements OnInit {
  events: any[] = [];
  currentPage: number = 1;
  hasMorePages: boolean = false;
  searchStr: string = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEventsOpen(this.currentPage, this.searchStr).subscribe(data => {
      this.events = data.events;
      this.hasMorePages = (data.total > this.currentPage * 10);
      this.addIsFullPropertyToEvents();
      this.changeDetector.detectChanges();
    });
  }

  addIsFullPropertyToEvents(): void {
    this.events.forEach(event => {
      event.isLoading = true;
      this.eventService.isFull(event.id).subscribe(isFull => {
        event.isFull = isFull;
        event.isLoading = false;
      });
    });
  }

  register(eventId: number): void {
    this.router.navigate(['events', eventId, 'inscription']);
  }

  showDetails(eventId: number): void {
    this.router.navigate(['events/', eventId]);
  }

  nextPage(): void {
    this.currentPage += 1;
    this.fetchEvents();
  }

  previousPage(): void {
    this.currentPage -= 1;
    this.fetchEvents();
  }

  searchEvents(): void {
    this.currentPage = 1;
    this.fetchEvents();
  }
}
