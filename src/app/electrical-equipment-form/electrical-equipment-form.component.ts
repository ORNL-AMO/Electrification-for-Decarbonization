import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ElectricalEquipment } from '../models/calculationData';
import { eGridRegion, electricityGridRegions, SubRegionData } from '../models/electricityGridRegions';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-electrical-equipment-form',
    templateUrl: './electrical-equipment-form.component.html',
    styleUrls: ['./electrical-equipment-form.component.css'],
    standalone: false
})
export class ElectricalEquipmentFormComponent implements OnInit {

  form: UntypedFormGroup;
  eGridRegions: Array<eGridRegion> = [];
  subregions: Array<SubRegionData> = [];
  equivalenHeatInput: number;
  potentialEmissions: number;
  potentialCosts: number;
  electricalCostAndEmissions: { cost: number, emissions: number };
  electricalCostAndEmissionsSub: Subscription;
  electricalHeatInput: number;
  electricalHeatInputSub: Subscription;
  electricalEquipmentSub: Subscription;
  isFormChangeUpdate: boolean = false;
  constructor(private formBuilder: UntypedFormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.eGridRegions = electricityGridRegions;
    this.electricalEquipmentSub = this.dataService.electricalEquipment.subscribe(val => {
      if (this.isFormChangeUpdate == false) {
        this.form = this.getFormFromObj(val);
        let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.form.controls.eGridRegion.value == val.region; });
        if (tmpRegion) {
          this.subregions = tmpRegion.subregions;
        }
      } else {
        this.isFormChangeUpdate = false;
      }
    })

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
    this.electricalEquipmentSub.unsubscribe();
  }


  getFormFromObj(obj: ElectricalEquipment): UntypedFormGroup {
    return this.formBuilder.group({
      "electricityCost": [obj.electricityCost],
      "equipmentEfficiency": [obj.equipmentEfficiency, [Validators.min(0), Validators.max(100)]],
      "eGridRegion": [obj.eGridRegion],
      "eGridSubregion": [obj.eGridSubregion],
      "carbonEmissions": [obj.carbonEmissions],
      "methaneEmissions": [obj.methaneEmissions],
      "nitrousEmissions": [obj.nitrousEmissions],
    });
  }

  save() {
    this.isFormChangeUpdate = true;
    this.dataService.electricalEquipment.next({
      electricityCost: this.form.controls.electricityCost.value,
      equipmentEfficiency: this.form.controls.equipmentEfficiency.value,
      eGridRegion: this.form.controls.eGridRegion.value,
      eGridSubregion: this.form.controls.eGridSubregion.value,
      carbonEmissions: this.form.controls.carbonEmissions.value,
      methaneEmissions: this.form.controls.methaneEmissions.value,
      nitrousEmissions: this.form.controls.nitrousEmissions.value
    });
  }

  setRegion() {
    let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.form.controls.eGridRegion.value == val.region; });
    if (tmpRegion) {
      this.subregions = tmpRegion.subregions;
      if (this.subregions.length != 0) {
        this.form.controls.eGridSubregion.patchValue(this.subregions[0].subregion);
        this.setSubRegion();
      }
    }
  }
  setSubRegion() {
    let tmpSubRegion: SubRegionData = this.subregions.find((val) => { return this.form.controls.eGridSubregion.value == val.subregion; });
    if (tmpSubRegion) {
      this.form.controls.carbonEmissions.patchValue(tmpSubRegion.carbonFactor);
      this.form.controls.methaneEmissions.patchValue(tmpSubRegion.methaneFactor);
      this.form.controls.nitrousEmissions.patchValue(tmpSubRegion.nitrousFactor);
      this.save()
    }
  }

  focusField(str: string) {
    this.dataService.currentField.next(str);
  }
}
