import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { EnergyEquivalencyComponent } from './energy-equivalency/energy-equivalency.component';
import { EnergyEquivalencyHelpComponent } from './energy-equivalency/energy-equivalency-help/energy-equivalency-help.component';
import { FuelFormComponent } from './energy-equivalency/fuel-form/fuel-form.component';
import { ElectricityFormComponent } from './energy-equivalency/electricity-form/electricity-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentEquipmentFormComponent } from './current-equipment-form/current-equipment-form.component';
import { ElectricalEquipmentFormComponent } from './electrical-equipment-form/electrical-equipment-form.component';
import { ResultsComponent } from './results/results.component';
import { HelpComponent } from './help/help.component';
import { OperatingHoursComponent } from './operating-hours/operating-hours.component';
import { NoopAnimationPlayer } from '@angular/animations';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    EnergyEquivalencyComponent,
    EnergyEquivalencyHelpComponent,
    FuelFormComponent,
    ElectricityFormComponent,
    CurrentEquipmentFormComponent,
    ElectricalEquipmentFormComponent,
    ResultsComponent,
    HelpComponent,
    OperatingHoursComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
