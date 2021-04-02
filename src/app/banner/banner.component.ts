import { Component, OnInit } from '@angular/core';
import { EnergyEquivalencyService } from '../energy-equivalency/energy-equivalency.service';
import { EnergyEquivalencyElectric, EnergyEquivalencyFuel } from '../models/energyEquivalency';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private energyEquivalencyService: EnergyEquivalencyService) { }

  ngOnInit(): void {
  }


  resetData() {
    let electricData: EnergyEquivalencyElectric = this.energyEquivalencyService.getDefaultElectricData();
    this.energyEquivalencyService.electricData.next(electricData);
    let fuelData: EnergyEquivalencyFuel = this.energyEquivalencyService.getDefaultFuelData();
    this.energyEquivalencyService.fuelData.next(fuelData);
  }

  generateExample() {
    let electricData: EnergyEquivalencyElectric = this.energyEquivalencyService.getExampleElectricData();
    this.energyEquivalencyService.electricData.next(electricData);
    let fuelData: EnergyEquivalencyFuel = this.energyEquivalencyService.getExampleFuelData();
    this.energyEquivalencyService.fuelData.next(fuelData);
  }


}
