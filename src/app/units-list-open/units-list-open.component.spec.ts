import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsListOpenComponent } from './units-list-open.component';

describe('UnitsListOpenComponent', () => {
  let component: UnitsListOpenComponent;
  let fixture: ComponentFixture<UnitsListOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsListOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsListOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
