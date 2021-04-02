import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnergyEquivalencyComponent } from './energy-equivalency.component';
import { EnergyEquivalencyHelpComponent } from './energy-equivalency-help/energy-equivalency-help.component';
import { EnergyEquivalencyService } from './energy-equivalency.service';
import { FuelFormComponent } from './energy-equivalency-form/fuel-form/fuel-form.component';
import { ElectricityFormComponent } from './energy-equivalency-form/electricity-form/electricity-form.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    EnergyEquivalencyComponent,
    EnergyEquivalencyHelpComponent,
    FuelFormComponent,
    ElectricityFormComponent
  ],
  exports: [
    EnergyEquivalencyComponent
  ],
  providers: [
    EnergyEquivalencyService
  ]
})
export class EnergyEquivalencyModule { }
