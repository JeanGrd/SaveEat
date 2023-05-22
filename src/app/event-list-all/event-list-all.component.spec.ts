import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListAllComponent } from './event-list-all.component';

describe('EventListComponent', () => {
  let component: EventListAllComponent;
  let fixture: ComponentFixture<EventListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
