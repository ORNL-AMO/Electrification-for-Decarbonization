import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FuelEquipment, ElectricalEquipment, ResultsSummary, EquipmentSummary } from '../models/calculationData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  operatingHours: BehaviorSubject<number>;
  fuelEquipment: BehaviorSubject<FuelEquipment>;
  electricalEquipment: BehaviorSubject<ElectricalEquipment>;
  electricalHeatInput: BehaviorSubject<number>;
  fuelCostAndEmissions: BehaviorSubject<{ cost: number, emissions: number }>;
  electricalCostAndEmissions: BehaviorSubject<{ cost: number, emissions: number }>;
  summary: BehaviorSubject<ResultsSummary>;
  currentField: BehaviorSubject<string>;

  constructor() {
    this.operatingHours = new BehaviorSubject<number>(1000);
    this.fuelEquipment = new BehaviorSubject<FuelEquipment>({
      energySource: undefined,
      fuelType: undefined,
      fuelCost: undefined,
      equipmentEfficiency: undefined,
      heatInput: undefined,
      emissionsOutputRate: undefined
    });
    this.electricalEquipment = new BehaviorSubject<ElectricalEquipment>({
      electricityCost: undefined,
      equipmentEfficiency: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      emissionsOutputRate: undefined
    });
    this.electricalHeatInput = new BehaviorSubject<number>(0);
    this.fuelCostAndEmissions = new BehaviorSubject<{ cost: number, emissions: number }>({ cost: 0, emissions: 0 });
    this.electricalCostAndEmissions = new BehaviorSubject<{ cost: number, emissions: number }>({ cost: 0, emissions: 0 });
    this.summary = new BehaviorSubject<ResultsSummary>(undefined);
    this.currentField = new BehaviorSubject<string>('default');
  }

  setExampleData(){
    this.operatingHours.next(1000);
    this.fuelEquipment.next({
      energySource: 'Natural Gas',
      fuelType: 'Natural Gas',
      fuelCost: 8,
      equipmentEfficiency: 60,
      heatInput: 10,
      emissionsOutputRate: 53.06
    });
    this.electricalEquipment.next({
      electricityCost: .066,
      equipmentEfficiency: 90,
      eGridRegion: 'WECC',
      eGridSubregion: 'CAMX: WECC California',
      emissionsOutputRate: 258.7692465
    });
  }


  setDefaultData(){
    this.operatingHours.next(8760);
    this.fuelEquipment.next({
      energySource: undefined,
      fuelType: undefined,
      fuelCost: undefined,
      equipmentEfficiency: undefined,
      heatInput: undefined,
      emissionsOutputRate: undefined
    });
    this.electricalEquipment.next({
      electricityCost: undefined,
      equipmentEfficiency: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      emissionsOutputRate: undefined
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
    let emissions: number = fuelEquipment.emissionsOutputRate * (fuelEquipment.heatInput / 1000) * operatingHours;
    let cost: number = fuelEquipment.heatInput * fuelEquipment.fuelCost * operatingHours;
    this.fuelCostAndEmissions.next({ cost: cost, emissions: emissions });
  }

  calculateElectricalCostAndEmissions() {
    let electricalEquipment: ElectricalEquipment = this.electricalEquipment.getValue();
    let electricalHeatInput: number = this.electricalHeatInput.getValue();
    let operatingHours: number = this.operatingHours.getValue()
    let emissions: number = electricalEquipment.emissionsOutputRate * (electricalHeatInput / 1000000) * operatingHours;
    let cost: number = electricalHeatInput * electricalEquipment.electricityCost * operatingHours;
    this.electricalCostAndEmissions.next({ cost: cost, emissions: emissions });
  }


  calculateSummary() {
    let electricalHeatInput: number = this.electricalHeatInput.getValue();
    let currentResults: EquipmentSummary = this.getCurrentResults();
    let potentialResults: EquipmentSummary = this.getPotentialResults();
    let impact: EquipmentSummary = {
      energyUseMMBtu: currentResults.energyUseMMBtu - potentialResults.energyUseMMBtu,
      energyUseKWh: currentResults.energyUseKWh - potentialResults.energyUseKWh,
      energyCost: currentResults.energyCost - potentialResults.energyCost,
      co2Emissions: currentResults.co2Emissions - potentialResults.co2Emissions,
      electricalDemandIncrease: electricalHeatInput
    }
    this.summary.next({
      current: currentResults,
      potential: potentialResults,
      impact: impact
    });
  }


  getCurrentResults(): EquipmentSummary {
    let fuelEquipment: FuelEquipment = this.fuelEquipment.getValue();
    let operatingHours: number = this.operatingHours.getValue();
    let energyUseMMBtu: number = fuelEquipment.heatInput * operatingHours;
    //todo convert
    let energyUseKWh: number = energyUseMMBtu / (1 / 293.072222);
    let fuelCostAndEmissions: { cost: number, emissions: number } = this.fuelCostAndEmissions.getValue();
    return {
      energyUseMMBtu: energyUseMMBtu,
      energyUseKWh: energyUseKWh,
      energyCost: fuelCostAndEmissions.cost,
      co2Emissions: fuelCostAndEmissions.emissions
    }
  }

  getPotentialResults(): EquipmentSummary {
    let operatingHours: number = this.operatingHours.getValue();
    let energyUseKWh: number = this.electricalHeatInput.getValue() * operatingHours;
    //todo convert
    let energyUseMMBtu: number = energyUseKWh * (1 / 293.072222);
    let electricalCostAndEmissions: { cost: number, emissions: number } = this.electricalCostAndEmissions.getValue();
    return {
      energyUseMMBtu: energyUseMMBtu,
      energyUseKWh: energyUseKWh,
      energyCost: electricalCostAndEmissions.cost,
      co2Emissions: electricalCostAndEmissions.emissions
    }

  }

}
