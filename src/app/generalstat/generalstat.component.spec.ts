import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralstatComponent } from './generalstat.component';

describe('GeneralstatComponent', () => {
  let component: GeneralstatComponent;
  let fixture: ComponentFixture<GeneralstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
