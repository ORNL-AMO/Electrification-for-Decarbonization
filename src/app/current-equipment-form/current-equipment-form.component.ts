import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FuelEquipment } from '../models/calculationData';
import { FuelTypeProperties, OtherFuel, otherFuels } from '../models/co2FuelSavingsFuels';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-current-equipment-form',
  templateUrl: './current-equipment-form.component.html',
  styleUrls: ['./current-equipment-form.component.css']
})
export class CurrentEquipmentFormComponent implements OnInit {

  form: UntypedFormGroup;
  fuelOptions: Array<FuelTypeProperties> = [];
  otherFuels: Array<OtherFuel> = [];
  currentEmissions: number;
  currentCost: number;
  fuelCostAndEmissions: { cost: number, emissions: number };
  fuelCostAndEmissionsSub: Subscription;

  fuelEquipmentSub: Subscription;
  isFormChangeUpdate: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.otherFuels = otherFuels;
    this.fuelEquipmentSub = this.dataService.fuelEquipment.subscribe(val => {
      if (this.isFormChangeUpdate == false) {
        this.form = this.getFormFromObj(val);
        let tmpOtherFuel: OtherFuel = this.otherFuels.find(fuel => { return this.form.controls.energySource.value == fuel.energySource; });
        if (tmpOtherFuel) {
          this.fuelOptions = tmpOtherFuel.fuelTypes;
        }
      } else {
        this.isFormChangeUpdate = false;
      }
    });

    this.fuelCostAndEmissionsSub = this.dataService.fuelCostAndEmissions.subscribe(val => {
      this.fuelCostAndEmissions = val;
    })

  }

  ngOnDestroy() {
    this.fuelCostAndEmissionsSub.unsubscribe();
    this.fuelEquipmentSub.unsubscribe();
  }


  getFormFromObj(obj: FuelEquipment): UntypedFormGroup {
    return this.formBuilder.group({
      // "energyType": [],
      "energySource": [obj.energySource],
      "fuelType": [obj.fuelType],
      "fuelCost": [obj.fuelCost],
      "equipmentEfficiency": [obj.equipmentEfficiency, [Validators.min(0), Validators.max(100)]],
      "heatInput": [obj.heatInput],
      "carbonEmissions": [obj.carbonEmissions],
      "methaneEmissions": [obj.methaneEmissions],
      "nitrousEmissions": [obj.nitrousEmissions]
    });
  }

  save() {
    this.isFormChangeUpdate = true;
    this.dataService.fuelEquipment.next({
      energySource: this.form.controls.energySource.value,
      fuelType: this.form.controls.fuelType.value,
      fuelCost: this.form.controls.fuelCost.value,
      equipmentEfficiency: this.form.controls.equipmentEfficiency.value,
      heatInput: this.form.controls.heatInput.value,
      carbonEmissions: this.form.controls.carbonEmissions.value,
      methaneEmissions: this.form.controls.methaneEmissions.value,
      nitrousEmissions: this.form.controls.nitrousEmissions.value,
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
    let tmpFuel: FuelTypeProperties = this.fuelOptions.find(fuelOption => { return this.form.controls.fuelType.value == fuelOption.fuelType; });
    if (tmpFuel) {
      this.form.controls.carbonEmissions.patchValue(tmpFuel.carbonFactor);
      this.form.controls.methaneEmissions.patchValue(tmpFuel.methaneFactor);
      this.form.controls.nitrousEmissions.patchValue(tmpFuel.nitrousFactor);
      this.save();
    }
  }


  focusField(str: string){
    this.dataService.currentField.next(str);
  }
}
