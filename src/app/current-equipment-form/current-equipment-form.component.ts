import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OtherFuel, otherFuels } from '../models/co2FuelSavingsFuels';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-current-equipment-form',
  templateUrl: './current-equipment-form.component.html',
  styleUrls: ['./current-equipment-form.component.css']
})
export class CurrentEquipmentFormComponent implements OnInit {

  form: FormGroup;
  fuelOptions: Array<{
    fuelType: string,
    outputRate: number
  }>;
  otherFuels: Array<OtherFuel>;
  currentEmissions: number;
  currentCost: number;
  fuelCostAndEmissions: { cost: number, emissions: number };
  fuelCostAndEmissionsSub: Subscription;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.otherFuels = otherFuels;
    this.fuelOptions = otherFuels[0].fuelTypes;
    this.initForm()

    this.fuelCostAndEmissionsSub = this.dataService.fuelCostAndEmissions.subscribe(val => {
      this.fuelCostAndEmissions = val;
    })

  }

  ngOnDestroy() {
    this.fuelCostAndEmissionsSub.unsubscribe();
  }


  initForm() {
    this.form = this.formBuilder.group({
      // "energyType": [],
      "energySource": [this.otherFuels[0].energySource],
      "fuelType": [this.fuelOptions[0].fuelType],
      "fuelCost": [3.99],
      "equipmentEfficiency": [60],
      "heatInput": [10],
      "emissionsOutputRate": [53.06]
    });
    this.save();
  }

  save() {
    this.dataService.fuelEquipment.next({
      energySource: this.form.controls.energySource.value,
      fuelType: this.form.controls.fuelType.value,
      fuelCost: this.form.controls.fuelCost.value,
      equipmentEfficiency: this.form.controls.equipmentEfficiency.value,
      heatInput: this.form.controls.heatInput.value,
      emissionsOutputRate: this.form.controls.emissionsOutputRate.value
    });
  }

  setFuelOptions() {
    let tmpOtherFuel: OtherFuel = this.otherFuels.find(fuel => { return this.form.controls.energySource.value == fuel.energySource; });
    if (tmpOtherFuel) {
      this.fuelOptions = tmpOtherFuel.fuelTypes;
      this.form.controls.fuelType.patchValue(this.fuelOptions[0].fuelType);
      this.setFuel();
    }
  }

  setFuel() {
    let tmpFuel: { fuelType: string, outputRate: number } = this.fuelOptions.find(fuelOption => { return this.form.controls.fuelType.value == fuelOption.fuelType; });
    if (tmpFuel) {
      this.form.controls.emissionsOutputRate.patchValue(tmpFuel.outputRate)
      this.save();
    }
  }

}
