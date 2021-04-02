import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnergyEquivalencyFuel } from 'src/app/models/energyEquivalency';
import { EnergyEquivalencyCalculationsService } from '../services/energy-equivalency-calculations.service';
import { EnergyEquivalencyFormService } from '../services/energy-equivalency-form.service';
import { EnergyEquivalencyService } from '../services/energy-equivalency.service';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.css']
})
export class FuelFormComponent implements OnInit {

  form: FormGroup;
  fuelDataSub: Subscription;
  fuelFiredHeatInput: number;
  isFormChangeUpdate: boolean = false;
  constructor(private energyEquivalencyService: EnergyEquivalencyService, private energyEquivalencyFormService: EnergyEquivalencyFormService,
    private energyEquivalencyCalculationsService: EnergyEquivalencyCalculationsService) { }

  ngOnInit(): void {
    this.fuelDataSub = this.energyEquivalencyService.fuelData.subscribe(data => {
      if (this.isFormChangeUpdate == false) {
        this.form = this.energyEquivalencyFormService.getFuelFormFromObj(data);
      } else {
        this.isFormChangeUpdate = false;
      }
      this.calculateHeatInput(data);
    });
  }

  ngOnDestroy() {
    this.fuelDataSub.unsubscribe();
  }

  save() {
    let fuelData: EnergyEquivalencyFuel = this.energyEquivalencyFormService.getFuelObjFromForm(this.form);
    this.isFormChangeUpdate = true;
    this.energyEquivalencyService.fuelData.next(fuelData);
  }

  calculateHeatInput(fuelData: EnergyEquivalencyFuel) {
    if (this.form.valid) {
      this.fuelFiredHeatInput = this.energyEquivalencyCalculationsService.calculateFuelHeatInput(fuelData);
    }
  }

  focusField(str: string) {
    this.energyEquivalencyService.currentField.next(str);
  }
}
