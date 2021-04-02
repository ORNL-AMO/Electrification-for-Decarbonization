import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnergyEquivalencyElectric, EnergyEquivalencyFuel } from '../models/energyEquivalency';

@Injectable()
export class EnergyEquivalencyService {

  electricData: BehaviorSubject<EnergyEquivalencyElectric>;
  fuelData: BehaviorSubject<EnergyEquivalencyFuel>;
  currentField: BehaviorSubject<string>;
  constructor() {
    let electricDefault: EnergyEquivalencyElectric = this.getDefaultElectricData();
    this.electricData = new BehaviorSubject<EnergyEquivalencyElectric>(electricDefault);
    let fuelDefault: EnergyEquivalencyFuel = this.getDefaultFuelData();
    this.fuelData = new BehaviorSubject<EnergyEquivalencyFuel>(fuelDefault);
    this.currentField = new BehaviorSubject<string>('default');
   }

  getExampleElectricData(): EnergyEquivalencyElectric {
      return {
        fuelFiredEfficiency: 60,
        electricallyHeatedEfficiency: 90,
        fuelFiredHeatInput: 10
      };
  }

  getExampleFuelData(): EnergyEquivalencyFuel {
    return {
      electricallyHeatedEfficiency: 90,
      fuelFiredEfficiency: 60,
      electricalHeatInput: 1800
    };
  }

  getDefaultElectricData(): EnergyEquivalencyElectric {
    return {
      fuelFiredEfficiency: 0,
      electricallyHeatedEfficiency: 0,
      fuelFiredHeatInput: 0
    };
  }

  getDefaultFuelData(): EnergyEquivalencyFuel {
    return {
      electricallyHeatedEfficiency: 0,
      fuelFiredEfficiency: 0,
      electricalHeatInput: 0
    };
  }
}
