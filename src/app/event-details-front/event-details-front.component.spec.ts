import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsFrontComponent } from './event-details-front.component';

describe('EventDetailsFrontComponent', () => {
  let component: EventDetailsFrontComponent;
  let fixture: ComponentFixture<EventDetailsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
