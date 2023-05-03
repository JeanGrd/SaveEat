import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsParticipantsComponent } from './stats-participants.component';

describe('StatsParticipantsComponent', () => {
  let component: StatsParticipantsComponent;
  let fixture: ComponentFixture<StatsParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
