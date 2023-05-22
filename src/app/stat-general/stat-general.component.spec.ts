import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatGeneralComponent } from './stat-general.component';

describe('GeneralstatComponent', () => {
  let component: StatGeneralComponent;
  let fixture: ComponentFixture<StatGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
