export interface eGridRegion {
    region: string;
    subregions: Array<SubRegionData>;
}

export interface SubRegionData {
    subregion: string,
    carbonFactor: number,
    methaneFactor: number,
    nitrousFactor: number
}

export const electricityGridRegions: Array<eGridRegion> = [
    {
        region: 'US',
        subregions: [
            {
                subregion: 'U.S. Average',
                carbonFactor: 429.6,
                methaneFactor: 38.56,
                nitrousFactor: 5.443
            }
        ]
    },
    {
        region: 'ASCC',
        subregions: [
            {
                subregion: 'AKGD: ASCC Alaska Grid',
                carbonFactor: 471.6,
                methaneFactor: 37.19,
                nitrousFactor: 4.99
            },
            {
                subregion: 'AKMS: ASCC Miscellaneous',
                carbonFactor: 4.99,
                methaneFactor: 10.89,
                nitrousFactor: 1.814
            }
        ]
    },
    {
        region: 'ERCOT',
        subregions: [
            {
                subregion: 'ERCT: ERCOT All',
                carbonFactor: 422.6,
                methaneFactor: 29.94,
                nitrousFactor: 4.082
            }
        ]
    },
    {
        region: 'FRCC',
        subregions: [
            {
                subregion: 'FRCC: FRCC All',
                carbonFactor: 422.7,
                methaneFactor: 29.94,
                nitrousFactor: 4.082
            }
        ]
    },
    {
        region: 'HICC',
        subregions: [
            {
                subregion: 'HIMS: HICC Miscellaneous',
                carbonFactor: 503.8,
                methaneFactor: 53.52,
                nitrousFactor: 8.165
            },
            {
                subregion: 'HIOA: HICC Oahu',
                carbonFactor: 757.5,
                methaneFactor: 81.65,
                nitrousFactor: 12.247
            }
        ]
    },
    {
        region: 'MRO',
        subregions: [
            {
                subregion: 'MROE: MRO East',
                carbonFactor: 761.1,
                methaneFactor: 76.66,
                nitrousFactor: 11.34
            },
            {
                subregion: 'MROW: MRO West',
                carbonFactor: 562.4,
                methaneFactor: 62.6,
                nitrousFactor: 9.072
            }
        ]
    },
    {
        region: 'NPCC',
        subregions: [
            {
                subregion: 'NEWE: NPCC New England',
                carbonFactor: 236.9,
                methaneFactor: 37.19,
                nitrousFactor: 4.99
            },
            {
                subregion: 'NYCW: NPCC NYC/Westchester',
                carbonFactor: 270.5,
                methaneFactor: 9.98,
                nitrousFactor: 1.361
            },
            {
                subregion: 'NYLI: NPCC Long Island',
                carbonFactor: 537.1,
                methaneFactor: 63.05,
                nitrousFactor: 8.165
            },
            {
                subregion: 'NYUP: NPCC Upstate NY',
                carbonFactor: 114.8,
                methaneFactor: 8.16,
                nitrousFactor: 0.907
            },
        ]
    },
    {
        region: 'RFC',
        subregions: [
            {
                subregion: 'RFCE: RFC East',
                carbonFactor: 324.8,
                methaneFactor: 27.67,
                nitrousFactor: 3.629
            },
            {
                subregion: 'RFCM: RFC Michigan',
                carbonFactor: 595.4,
                methaneFactor: 58.51,
                nitrousFactor: 8.165
            },
            {
                subregion: 'RFCW: RFC West',
                carbonFactor: 528.9,
                methaneFactor: 53.07,
                nitrousFactor: 7.711
            }
        ]
    },
    {
        region: 'SERC',
        subregions: [
            {
                subregion: 'SRMV: SERC Mississippi Valley',
                carbonFactor: 387.6,
                methaneFactor: 24.95,
                nitrousFactor: 3.629
            },
            {
                subregion: 'SRMW: SERC Midwest',
                carbonFactor: 754.9,
                methaneFactor: 83.91,
                nitrousFactor: 12.247
            },
            {
                subregion: 'SRSO: SERC South',
                carbonFactor: 466.2,
                methaneFactor: 36.74,
                nitrousFactor: 5.443
            },
            {
                subregion: 'SRTV: SERC Tennessee Valley',
                carbonFactor: 467.9,
                methaneFactor: 44,
                nitrousFactor: 6.35
            },
            {
                subregion: 'SRVC: SERC Virginia/Carolina',
                carbonFactor: 337.2,
                methaneFactor: 30.39,
                nitrousFactor: 4.082
            }
        ]
    },
    {
        region: 'SPP',
        subregions: [
            {
                subregion: 'SPNO: SPP North',
                carbonFactor: 527.6,
                methaneFactor: 56.25,
                nitrousFactor: 8.165
            },
            {
                subregion: 'SPSO: SPP South',
                carbonFactor: 529.2,
                methaneFactor: 41.28,
                nitrousFactor: 5.897
            }
        ]
    },
    {
        region: 'WECC',
        subregions: [
            {
                subregion: 'AZNM: WECC Southwest',
                carbonFactor: 463.8,
                methaneFactor: 34.93,
                nitrousFactor: 4.99
            },
            {
                subregion: 'CAMX: WECC California',
                carbonFactor: 225.2,
                methaneFactor: 15.42,
                nitrousFactor: 1.814
            },
            {

                subregion: 'NWPP: WECC Northwest',
                carbonFactor: 289.8,
                methaneFactor: 29.03,
                nitrousFactor: 4.082
            },
            {
                subregion: 'RMPA: WECC Rockies',
                carbonFactor: 577.7,
                methaneFactor: 55.79,
                nitrousFactor: 8.165
            }
        ]
    },
    {
        region: 'PV',
        subregions: [
            {
                subregion: 'Wind',
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0
            }
        ]
    },
    {
        region: 'Other',
        subregions: []
    }
];
