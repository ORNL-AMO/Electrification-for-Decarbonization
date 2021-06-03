import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-operating-hours',
  templateUrl: './operating-hours.component.html',
  styleUrls: ['./operating-hours.component.css'],
  animations: [
    trigger('modal', [
      state('show', style({
        top: '50px'
      })),
      transition('hide => show', animate('.5s ease-in')),
      transition('show => hide', animate('.5s ease-out'))
    ])
  ]
})
export class OperatingHoursComponent implements OnInit {

  @ViewChild('formElement', { static: false }) formElement: ElementRef;
  form: FormGroup;
  operatingHoursSub: Subscription;
  operatingHoursForm: FormGroup;
  showModal: string = 'hide';
  calculatedHoursPerYear: number = 8760;
  modalWidth: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    let operatingHours: number = this.dataService.operatingHours.getValue();
    this.form = this.formBuilder.group({
      'operatingHours': [operatingHours, [Validators.required, Validators.min(0), Validators.max(8760)]]
    });

    this.operatingHoursForm = this.formBuilder.group(
      {
        'weeksPerYear': [52.14, [Validators.min(0), Validators.max(53), Validators.required]],
        'daysPerWeek': [7, [Validators.min(0), Validators.max(7), Validators.required]],
        'hoursPerDay': [24, [Validators.min(0), Validators.max(24), Validators.required]]
      }
    )
  }


  openOperatingHoursModal() {
    if (this.formElement) {
      this.modalWidth = this.formElement.nativeElement.clientWidth - 20;
    }
    this.showModal = 'show';
  }

  changeField(str: string) {

  }

  save() {
    this.dataService.operatingHours.next(this.form.controls.operatingHours.value);
  }

  calculatHrsPerYear() {
    this.calculatedHoursPerYear = Math.round(this.operatingHoursForm.controls.daysPerWeek.value * this.operatingHoursForm.controls.weeksPerYear.value * this.operatingHoursForm.controls.hoursPerDay.value);
  }

  addOne(control: AbstractControl) {
    let value: number = control.value + 1;
    control.patchValue(value);
    this.calculatHrsPerYear();
  }

  subtractOne(control: AbstractControl) {
    let value: number = control.value - 1;
    control.patchValue(value);
    this.calculatHrsPerYear();
  }

  closeOperatingHoursModal() {
    this.showModal = 'hide';
  }

  submitOperatingHours() {
    this.form.controls.operatingHours.patchValue(this.calculatedHoursPerYear);
    this.save();
    this.closeOperatingHoursModal();
  }

  focusField(str: string){
    this.dataService.currentField.next(str);
  }
}
