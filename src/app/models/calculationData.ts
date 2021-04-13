export interface FuelEquipment {
    energySource: string,
    fuelType: string,
    fuelCost: number,
    equipmentEfficiency: number,
    heatInput: number,
    emissionsOutputRate: number
}

export interface ElectricalEquipment {
    electricityCost: number,
    equipmentEfficiency: number,
    eGridRegion: string,
    eGridSubregion: string,
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