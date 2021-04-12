import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { eGridRegion, electricityGridRegions } from '../models/electricityGridRegions';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-electrical-equipment-form',
  templateUrl: './electrical-equipment-form.component.html',
  styleUrls: ['./electrical-equipment-form.component.css']
})
export class ElectricalEquipmentFormComponent implements OnInit {

  form: FormGroup;
  eGridRegions: Array<eGridRegion>;
  subregions: Array<{
    subregion: string,
    outputRate: number
  }>;
  equivalenHeatInput: number;
  potentialEmissions: number;
  potentialCosts: number;
  electricalCostAndEmissions: { cost: number, emissions: number };
  electricalCostAndEmissionsSub: Subscription;
  electricalHeatInput: number;
  electricalHeatInputSub: Subscription;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.eGridRegions = electricityGridRegions;
    this.subregions = this.eGridRegions[0].subregions;
    this.initForm();

    this.electricalCostAndEmissionsSub = this.dataService.electricalCostAndEmissions.subscribe(val => {
      this.electricalCostAndEmissions = val;
    });

    this.electricalHeatInputSub = this.dataService.electricalHeatInput.subscribe(val => {
      this.electricalHeatInput = val;
    })
  }

  ngOnDestroy() {
    this.electricalCostAndEmissionsSub.unsubscribe();
    this.electricalHeatInputSub.unsubscribe();
  }


  initForm() {
    this.form = this.formBuilder.group({
      "electricityCost": [.066],
      "equipmentEfficiency": [90],
      "eGridRegion": [this.eGridRegions[0].region],
      "eGridSubregion": [this.subregions[0].subregion],
      "emissionsOutputRate": [this.subregions[0].outputRate]
    });
    this.save();
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
