import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEquipmentFormComponent } from './current-equipment-form.component';

describe('CurrentEquipmentFormComponent', () => {
  let component: CurrentEquipmentFormComponent;
  let fixture: ComponentFixture<CurrentEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentEquipmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
