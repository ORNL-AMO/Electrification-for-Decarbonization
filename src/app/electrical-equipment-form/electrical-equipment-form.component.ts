import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { eGridRegion, electricityGridRegions } from '../models/electricityGridRegions';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-electrical-equipment-form',
  templateUrl: './electrical-equipment-form.component.html',
  styleUrls: ['./electrical-equipment-form.component.css']
})
export class ElectricalEquipmentFormComponent implements OnInit {

  form: FormGroup;
  // fuelOptions: Array<{
  //   fuelType: string,
  //   outputRate: number
  // }>;
  // otherFuels: Array<OtherFuel>; 
  eGridRegions: Array<eGridRegion>;
  subregions: Array<{
    subregion: string,
    outputRate: number
  }>;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.eGridRegions = electricityGridRegions;
    this.subregions = this.eGridRegions[0].subregions;
    this.initForm();
  }


  initForm() {
    this.form = this.formBuilder.group({
      // "energyType": [],
      "electricityCost": [.066],
      "equipmentEfficiency": [],
      "eGridRegion": [this.eGridRegions[0].region],
      "eGridSubregion": [this.subregions[0].subregion],
      "emissionsOutputRate": [this.subregions[0].outputRate]
    });
  }

  save() {
    this.dataService.electricalEquipment.next({
      electricityCost: this.form.controls.electricityCost.value,
      equipmentEfficiency: this.form.controls.equipmentEfficiency.value,
      eGridRegion: this.form.controls.eGridRegion.value,
      eGridSubregion: this.form.controls.eGridSubregion.value,
      emissionsOutputRate: this.form.controls.emissionsOutputRate.value
    });
  }

  setRegion() {
    let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.form.controls.eGridRegion.value == val.region; });
    if (tmpRegion) {
      this.subregions = tmpRegion.subregions;
      this.setSubRegion();
    }
  }
  setSubRegion() {
    let tmpSubRegion: { subregion: string, outputRate: number } = this.subregions.find((val) => { return this.form.controls.eGridSubregion.value == val.subregion; });
    if (tmpSubRegion) {
      this.form.controls.emissionsOutputRate.patchValue(tmpSubRegion.outputRate);
      this.save()
    }
  }
}
