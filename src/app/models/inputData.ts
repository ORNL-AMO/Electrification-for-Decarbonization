export interface CurrentEquipment {
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