import { Injectable } from '@angular/core';
import { EnergyEquivalencyElectric, EnergyEquivalencyFuel } from '../../models/energyEquivalency';

@Injectable({
  providedIn: 'root'
})
export class EnergyEquivalencyCalculationsService {

  constructor() { }

  calculateElectricalHeatInput(electricData: EnergyEquivalencyElectric): number {
    return electricData.fuelFiredHeatInput * electricData.fuelFiredEfficiency / electricData.electricallyHeatedEfficiency * 1000000 / 3413;
  }

  calculateFuelHeatInput(fuelData: EnergyEquivalencyFuel): number {
    return (fuelData.electricalHeatInput * fuelData.electricallyHeatedEfficiency) / fuelData.fuelFiredEfficiency * .003413;
  }
}
