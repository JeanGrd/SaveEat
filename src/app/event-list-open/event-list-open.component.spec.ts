import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListOpenComponent } from './event-list-open.component';

describe('EventListOpenComponent', () => {
  let component: EventListOpenComponent;
  let fixture: ComponentFixture<EventListOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
