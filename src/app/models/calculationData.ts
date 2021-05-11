export interface FuelEquipment {
    energySource: string,
    fuelType: string,
    fuelCost: number,
    equipmentEfficiency: number,
    heatInput: number,
    carbonEmissions: number,
    methaneEmissions: number,
    nitrousEmissions: number,
}

export interface ElectricalEquipment {
    electricityCost: number,
    equipmentEfficiency: number,
    eGridRegion: string,
    eGridSubregion: string,
    carbonEmissions: number,
    methaneEmissions: number,
    nitrousEmissions: number,
}


export interface ResultsSummary{
    current: EquipmentSummary,
    potential: EquipmentSummary,
    impact: EquipmentSummary,
    percentCostReduction: number,
    percentCO2Reduction: number,
    percentEnergyReduction: number
}

export interface EquipmentSummary {
    energyUseMMBtu: number,
    energyUseMWh: number,
    energyCost: number,
    co2Emissions: number,
    co2EmissionsEquivelant: number,
    electricalDemandIncrease?: number
}


export interface EmissionsResults
  { 
    cost: number, 
    emissions: number 
    emissionsEquivelant: number 
  }