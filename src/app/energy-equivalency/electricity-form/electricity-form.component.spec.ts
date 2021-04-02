import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityFormComponent } from './electricity-form.component';

describe('ElectricityFormComponent', () => {
  let component: ElectricityFormComponent;
  let fixture: ComponentFixture<ElectricityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
