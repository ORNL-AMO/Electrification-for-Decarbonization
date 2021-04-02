import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EnergyEquivalencyModule } from './energy-equivalency/energy-equivalency.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EnergyEquivalencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
