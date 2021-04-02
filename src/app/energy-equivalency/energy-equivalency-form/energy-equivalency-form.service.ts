import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnergyEquivalencyElectric, EnergyEquivalencyFuel } from 'src/app/models/energyEquivalency';

@Injectable({
  providedIn: 'root'
})
export class EnergyEquivalencyFormService {

  constructor(private formBuilder: FormBuilder) { }

  getElectricFormFromObj(inputObj: EnergyEquivalencyElectric): FormGroup {
    let tmpForm: FormGroup = this.formBuilder.group({
      electricallyHeatedEfficiency: [inputObj.electricallyHeatedEfficiency, [Validators.required, Validators.min(0), Validators.max(100)]],
      fuelFiredEfficiency: [inputObj.fuelFiredEfficiency, [Validators.required, Validators.min(0), Validators.max(100)]],
      fuelFiredHeatInput: [inputObj.fuelFiredHeatInput, [Validators.required, Validators.min(0)]]
    });
    return tmpForm;
  }

  getElectricObjFromForm(form: FormGroup): EnergyEquivalencyElectric {
    return {
      fuelFiredEfficiency: form.controls.fuelFiredEfficiency.value,
      electricallyHeatedEfficiency: form.controls.electricallyHeatedEfficiency.value,
      fuelFiredHeatInput: form.controls.fuelFiredHeatInput.value,
    };
  }

  getFuelFormFromObj(inputObj: EnergyEquivalencyFuel): FormGroup {
    let tmpForm: FormGroup = this.formBuilder.group({
      electricallyHeatedEfficiency: [inputObj.electricallyHeatedEfficiency, [Validators.required, Validators.min(0), Validators.max(100)]],
      fuelFiredEfficiency: [inputObj.fuelFiredEfficiency, [Validators.required, Validators.min(0), Validators.max(100)]],
      electricalHeatInput: [inputObj.electricalHeatInput, [Validators.required, Validators.min(0)]]
    });
    return tmpForm;
  }

  getFuelObjFromForm(form: FormGroup): EnergyEquivalencyFuel {
    return {
      fuelFiredEfficiency: form.controls.fuelFiredEfficiency.value,
      electricallyHeatedEfficiency: form.controls.electricallyHeatedEfficiency.value,
      electricalHeatInput: form.controls.electricalHeatInput.value,
    };
  }
}
