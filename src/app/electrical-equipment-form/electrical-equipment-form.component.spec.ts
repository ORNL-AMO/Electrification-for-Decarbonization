import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalEquipmentFormComponent } from './electrical-equipment-form.component';

describe('ElectricalEquipmentFormComponent', () => {
  let component: ElectricalEquipmentFormComponent;
  let fixture: ComponentFixture<ElectricalEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricalEquipmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
