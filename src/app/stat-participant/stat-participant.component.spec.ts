import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatParticipantComponent } from './stat-participant.component';

describe('StatsParticipantsComponent', () => {
  let component: StatParticipantComponent;
  let fixture: ComponentFixture<StatParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
