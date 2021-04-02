import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnergyEquivalencyElectric } from 'src/app/models/energyEquivalency';
import { EnergyEquivalencyCalculationsService } from '../../energy-equivalency-calculations.service';
import { EnergyEquivalencyService } from '../../energy-equivalency.service';
import { EnergyEquivalencyFormService } from '../energy-equivalency-form.service';

@Component({
  selector: 'app-electricity-form',
  templateUrl: './electricity-form.component.html',
  styleUrls: ['./electricity-form.component.css']
})
export class ElectricityFormComponent implements OnInit {

  form: FormGroup;
  electricDataSub: Subscription;
  electricalHeatInput: number;
  isFormChangeUpdate: boolean = false;
  constructor(private energyEquivalencyService: EnergyEquivalencyService, private energyEquivalencyFormService: EnergyEquivalencyFormService,
    private energyEquivalencyCalculationsService: EnergyEquivalencyCalculationsService) { }

  ngOnInit(): void {
    this.electricDataSub = this.energyEquivalencyService.electricData.subscribe(data => {
      if(this.isFormChangeUpdate == false){
        this.form = this.energyEquivalencyFormService.getElectricFormFromObj(data);
      }else{
        this.isFormChangeUpdate = false;
      }
      this.calculateHeatInput(data);
    });
  }

  ngOnDestroy() {
    this.electricDataSub.unsubscribe();
  }

  save() {
    let electricData: EnergyEquivalencyElectric = this.energyEquivalencyFormService.getElectricObjFromForm(this.form);
    this.isFormChangeUpdate = true;
    this.energyEquivalencyService.electricData.next(electricData);
  }

  calculateHeatInput(electricData: EnergyEquivalencyElectric) {
    if (this.form.valid) {
      this.electricalHeatInput = this.energyEquivalencyCalculationsService.calculateElectricalHeatInput(electricData);
    }
  }

  focusField(str: string) {
    this.energyEquivalencyService.currentField.next(str);
  }
}
