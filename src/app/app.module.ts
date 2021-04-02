import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EnergyEquivalencyModule } from './energy-equivalency/energy-equivalency.module';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    EnergyEquivalencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
