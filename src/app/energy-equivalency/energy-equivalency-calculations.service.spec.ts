import { TestBed } from '@angular/core/testing';

import { EnergyEquivalencyCalculationsService } from './energy-equivalency-calculations.service';

describe('EnergyEquivalencyCalculationsService', () => {
  let service: EnergyEquivalencyCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyEquivalencyCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
