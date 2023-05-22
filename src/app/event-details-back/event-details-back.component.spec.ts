import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsBackComponent } from './event-details-back.component';

describe('EventDetailsComponent', () => {
  let component: EventDetailsBackComponent;
  let fixture: ComponentFixture<EventDetailsBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailsBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
