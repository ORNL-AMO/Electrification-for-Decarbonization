import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentEquipmentFormComponent } from './current-equipment-form/current-equipment-form.component';
import { ElectricalEquipmentFormComponent } from './electrical-equipment-form/electrical-equipment-form.component';
import { ResultsComponent } from './results/results.component';
import { HelpComponent } from './help/help.component';
import { OperatingHoursComponent } from './operating-hours/operating-hours.component';
import { PlotlyViaWindowModule } from 'angular-plotly.js';

import { GaugeComponent } from './results/gauge/gauge.component';
import { BarComponent } from './results/bar/bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    CurrentEquipmentFormComponent,
    ElectricalEquipmentFormComponent,
    ResultsComponent,
    HelpComponent,
    OperatingHoursComponent,
    GaugeComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PlotlyViaWindowModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
