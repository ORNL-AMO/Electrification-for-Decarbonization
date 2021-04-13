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

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
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
