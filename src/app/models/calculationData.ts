export interface FuelEquipment {
    energySource: number,
    fuelType: number,
    fuelCost: number,
    equipmentEfficiency: number,
    heatInput: number,
    emissionsOutputRate: number
}

export interface ElectricalEquipment {
    electricityCost: number,
    equipmentEfficiency: number,
    eGridRegion: number,
    eGridSubregion: number,
    emissionsOutputRate: number
}


export interface ResultsSummary{
    current: EquipmentSummary,
    potential: EquipmentSummary,
    impact: EquipmentSummary,
}

export interface EquipmentSummary {
    energyUseMMBtu: number,
    energyUseKWh: number,
    energyCost: number,
    co2Emissions: number,
    electricalDemandIncrease?: number
}