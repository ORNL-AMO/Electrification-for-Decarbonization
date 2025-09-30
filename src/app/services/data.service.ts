import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FuelEquipment, ElectricalEquipment, ResultsSummary, EquipmentSummary, EmissionsResults } from '../models/calculationData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  operatingHours: BehaviorSubject<number>;
  fuelEquipment: BehaviorSubject<FuelEquipment>;
  electricalEquipment: BehaviorSubject<ElectricalEquipment>;
  electricalHeatInput: BehaviorSubject<number>;
  fuelCostAndEmissions: BehaviorSubject<EmissionsResults>;
  electricalCostAndEmissions: BehaviorSubject<EmissionsResults>;
  summary: BehaviorSubject<ResultsSummary>;
  currentField: BehaviorSubject<string>;
  showEmissionRateInformation: WritableSignal<boolean> = signal(false);

  constructor() {
    this.operatingHours = new BehaviorSubject<number>(8760);
    this.fuelEquipment = new BehaviorSubject<FuelEquipment>({
      energySource: undefined,
      fuelType: undefined,
      fuelCost: undefined,
      equipmentEfficiency: undefined,
      heatInput: undefined,
      carbonEmissions: undefined,
      methaneEmissions: undefined,
      nitrousEmissions: undefined,
    });
    this.electricalEquipment = new BehaviorSubject<ElectricalEquipment>({
      electricityCost: undefined,
      equipmentEfficiency: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      carbonEmissions: undefined,
      methaneEmissions: undefined,
      nitrousEmissions: undefined,
    });
    this.electricalHeatInput = new BehaviorSubject<number>(0);
    this.fuelCostAndEmissions = new BehaviorSubject<EmissionsResults>({ cost: 0, emissions: 0, emissionsEquivelant: 0 });
    this.electricalCostAndEmissions = new BehaviorSubject<EmissionsResults>({ cost: 0, emissions: 0, emissionsEquivelant: 0 });
    this.summary = new BehaviorSubject<ResultsSummary>(undefined);
    this.currentField = new BehaviorSubject<string>('default');
  }

  setExampleData() {
    this.operatingHours.next(8760);
    this.fuelEquipment.next({
      energySource: 'Natural Gas',
      fuelType: 'Natural Gas',
      fuelCost: 4,
      equipmentEfficiency: 60,
      heatInput: 10,
      carbonEmissions: 53.06,
      methaneEmissions: 1,
      nitrousEmissions: .1,
    });
    this.electricalEquipment.next({
      electricityCost: .066,
      equipmentEfficiency: 90,
      eGridRegion: 'WECC',
      eGridSubregion: 'CAMX: WECC California',
      carbonEmissions: 225.2,
      methaneEmissions: 15.42,
      nitrousEmissions: 1.814,
    });
  }


  setDefaultData() {
    this.operatingHours.next(8760);
    this.fuelEquipment.next({
      energySource: undefined,
      fuelType: undefined,
      fuelCost: undefined,
      equipmentEfficiency: undefined,
      heatInput: undefined,
      carbonEmissions: undefined,
      methaneEmissions: undefined,
      nitrousEmissions: undefined,
    });
    this.electricalEquipment.next({
      electricityCost: undefined,
      equipmentEfficiency: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      carbonEmissions: undefined,
      methaneEmissions: undefined,
      nitrousEmissions: undefined,
    });
  }

  calculateResults() {
    let electricalEquipment: ElectricalEquipment = this.electricalEquipment.getValue();
    let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
    if (electricalEquipment && fuelEquipment) {
      this.calculateElectricalHeatInput();
      this.calculateFuelCostAndEmissions();
      this.calculateElectricalCostAndEmissions();
      this.calculateSummary();
    }
  }


  calculateElectricalHeatInput() {
    let electricalEquipment: ElectricalEquipment = this.electricalEquipment.getValue();
    let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
    let electricalHeatInput: number = fuelEquipment.heatInput * fuelEquipment.equipmentEfficiency / electricalEquipment.equipmentEfficiency * 1000000 / 3413;
    this.electricalHeatInput.next(electricalHeatInput);
  }

  // calculateFuelHeatInput() {
  //   let electricalEquipment: ElectricalEquipment = this.electricalEquipment.getValue();
  //   let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
  //   let electricalHeatInput: number = this.electricalHeatInput.getValue();
  //   return (electricalHeatInput * electricalEquipment.equipmentEfficiency) / fuelEquipment.equipmentEfficiency * .003413;
  // }


  calculateFuelCostAndEmissions() {
    let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
    let operatingHours: number = this.operatingHours.getValue()
    let emissions: number = fuelEquipment.carbonEmissions * (fuelEquipment.heatInput / 1000) * operatingHours;
    let emissionsEquivelant: number = ((fuelEquipment.methaneEmissions * 25/1000) + (fuelEquipment.nitrousEmissions * 298/1000) + fuelEquipment.carbonEmissions) * ((fuelEquipment.heatInput / 1000) * operatingHours);
    let cost: number = fuelEquipment.heatInput * fuelEquipment.fuelCost * operatingHours;
    this.fuelCostAndEmissions.next({ cost: cost, emissions: emissions, emissionsEquivelant: emissionsEquivelant });
  }

  calculateElectricalCostAndEmissions() {
    let electricalEquipment: ElectricalEquipment = this.electricalEquipment.getValue();
    let electricalHeatInput: number = this.electricalHeatInput.getValue();
    let operatingHours: number = this.operatingHours.getValue()
    let emissions: number = electricalEquipment.carbonEmissions * (electricalHeatInput / 1000000) * operatingHours;
    let emissionsEquivelant: number = ((electricalEquipment.methaneEmissions * 25/1000) + (electricalEquipment.nitrousEmissions * 298/1000) + electricalEquipment.carbonEmissions) * ((electricalHeatInput / 1000000) * operatingHours);
    let cost: number = electricalHeatInput * electricalEquipment.electricityCost * operatingHours;
    this.electricalCostAndEmissions.next({ cost: cost, emissions: emissions, emissionsEquivelant: emissionsEquivelant });
  }


  calculateSummary() {
    let electricalHeatInput: number = this.electricalHeatInput.getValue();
    let currentResults: EquipmentSummary = this.getCurrentResults();
    let potentialResults: EquipmentSummary = this.getPotentialResults();
    let impact: EquipmentSummary = {
      energyUseMMBtu: currentResults.energyUseMMBtu - potentialResults.energyUseMMBtu,
      energyUseMWh: currentResults.energyUseMWh - potentialResults.energyUseMWh,
      energyCost: currentResults.energyCost - potentialResults.energyCost,
      co2Emissions: currentResults.co2Emissions - potentialResults.co2Emissions,
      co2EmissionsEquivelant: currentResults.co2EmissionsEquivelant - potentialResults.co2EmissionsEquivelant,
      electricalDemandIncrease: electricalHeatInput
    }
    this.summary.next({
      current: currentResults,
      potential: potentialResults,
      impact: impact,
      percentCO2Reduction: this.getPercentSavings(currentResults.co2Emissions, potentialResults.co2Emissions),
      percentCostReduction: this.getPercentSavings(currentResults.energyCost, potentialResults.energyCost),
      percentEnergyReduction: this.getPercentSavings(currentResults.energyUseMMBtu, potentialResults.energyUseMMBtu)
    });
  }


  getCurrentResults(): EquipmentSummary {
    let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
    let operatingHours: number = this.operatingHours.getValue();
    let energyUseMMBtu: number = fuelEquipment.heatInput * operatingHours;
    //todo convert
    let energyUseMWh: number = (energyUseMMBtu / (1 / 293.072222)) / 1000;
    let fuelCostAndEmissions: EmissionsResults = this.fuelCostAndEmissions.getValue();
    return {
      energyUseMMBtu: energyUseMMBtu,
      energyUseMWh: energyUseMWh,
      energyCost: fuelCostAndEmissions.cost,
      co2Emissions: fuelCostAndEmissions.emissions,
      co2EmissionsEquivelant: fuelCostAndEmissions.emissionsEquivelant,
    }
  }

  getPotentialResults(): EquipmentSummary {
    let operatingHours: number = this.operatingHours.getValue();
    let energyUsekWh: number = this.electricalHeatInput.getValue() * operatingHours;
    //todo convert
    let energyUseMMBtu: number = energyUsekWh * (1 / 293.072222);
    let energyUseMWh: number = energyUsekWh / 1000;
    let electricalCostAndEmissions: EmissionsResults = this.electricalCostAndEmissions.getValue();
    return {
      energyUseMMBtu: energyUseMMBtu,
      energyUseMWh: energyUseMWh,
      energyCost: electricalCostAndEmissions.cost,
      co2Emissions: electricalCostAndEmissions.emissions,
      co2EmissionsEquivelant: electricalCostAndEmissions.emissionsEquivelant,
    }

  }

  getPercentSavings(existing: number, potential: number): number {
    return ((existing - potential) / existing) * 100
  }

}
