export interface OtherFuel {
    energySource: string;
    fuelTypes: Array<FuelTypeProperties>;
}

export interface FuelTypeProperties {
    fuelType: string,
    carbonFactor: number,
    methaneFactor: number,
    nitrousFactor: number,
}

export const otherFuels: Array<OtherFuel> = [
    {
        energySource: 'Steam & Hot Water',
        fuelTypes: [
            {
                fuelType: 'Steam & Hot Water',
                carbonFactor: 66.33,
                methaneFactor: 1.25,
                nitrousFactor: .125,
            }
        ]

    },
    {
        energySource: 'Natural Gas',
        fuelTypes: [
            {
                fuelType: 'Natural Gas',
                carbonFactor: 53.06,
                methaneFactor: 1,
                nitrousFactor: .1,
            }
        ]
    },
    {
        energySource: 'Liquified petroleum gases (LPG)',
        fuelTypes: [
            {
                fuelType: 'Liquified petroleum gases (LPG)',
                carbonFactor: 61.71,
                methaneFactor: 3,
                nitrousFactor: .6,
            }
        ]

    },
    {
        energySource: 'Distillate (Light) Fuel Oil',
        fuelTypes: [
            {
                fuelType: 'Distillate Fuel #2',
                carbonFactor: 73.96,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Distillate Fuel #1',
                carbonFactor: 73.25,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Distillate Fuel #4',
                carbonFactor: 75.04,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Residual Fuel #6',
                carbonFactor: 75.1,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Residual Fuel #5',
                carbonFactor: 72.93,
                methaneFactor: 3,
                nitrousFactor: .6,
            },

        ]

    },
    {
        energySource: 'Coal',
        fuelTypes: [
            {
                fuelType: 'Mixed - Industrial Sector',
                carbonFactor: 94.67,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Anthracite',
                carbonFactor: 103.69,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Bituminous',
                carbonFactor: 93.28,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Subbituminous',
                carbonFactor: 97.17,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Lignite',
                carbonFactor: 97.72,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Mixed - Commercial',
                carbonFactor: 94.27,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
        ]
    },
    {
        energySource: 'Other fuels',
        fuelTypes: [
            {
                fuelType: 'Coal (industrial coking)',
                carbonFactor: 93.9,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Coal Coke',
                carbonFactor: 113.67,
                methaneFactor: 11,
                nitrousFactor: 1.6,
            },
            {
                fuelType: 'Petroleum Coke',
                carbonFactor: 102.41,
                methaneFactor: 32,
                nitrousFactor: 4.2,
            },
            {
                fuelType: 'Blast Furnace Gas',
                carbonFactor: 274.32,
                methaneFactor: .22,
                nitrousFactor: .1,
            },
            {
                fuelType: 'Still Gas',
                carbonFactor: 66.72,
                methaneFactor: 1,
                nitrousFactor: .1,
            },
            {
                fuelType: 'Coke Oven Gas',
                carbonFactor: 46.85,
                methaneFactor: .48,
                nitrousFactor: .1,
            },
            {
                fuelType: 'Crude Oil',
                carbonFactor: 74.54,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Motor Gasoline',
                carbonFactor: 70.22,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Propane',
                carbonFactor: 62.87,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Propylene',
                carbonFactor: 67.77,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Ethane',
                carbonFactor: 59.6,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Ethylene',
                carbonFactor: 65.96,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Isobutane',
                carbonFactor: 64.94,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Butane',
                carbonFactor: 64.77,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Pentanes Plus',
                carbonFactor: 70.02,
                methaneFactor: 3,
                nitrousFactor: .6,
            },
            {
                fuelType: 'Kerosene',
                carbonFactor: 75.2,
                methaneFactor: 3,
                nitrousFactor: .6,
            }

        ]
    }
];
