import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreMissionComponent } from './notre-mission.component';

describe('NotreMissionComponent', () => {
  let component: NotreMissionComponent;
  let fixture: ComponentFixture<NotreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
