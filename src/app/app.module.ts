import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { EnergyEquivalencyComponent } from './energy-equivalency/energy-equivalency.component';
import { EnergyEquivalencyHelpComponent } from './energy-equivalency/energy-equivalency-help/energy-equivalency-help.component';
import { FuelFormComponent } from './energy-equivalency/fuel-form/fuel-form.component';
import { ElectricityFormComponent } from './energy-equivalency/electricity-form/electricity-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    EnergyEquivalencyComponent,
    EnergyEquivalencyHelpComponent,
    FuelFormComponent,
    ElectricityFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
