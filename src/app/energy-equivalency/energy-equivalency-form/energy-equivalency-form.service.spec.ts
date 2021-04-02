import { TestBed } from '@angular/core/testing';

import { EnergyEquivalencyFormService } from './energy-equivalency-form.service';

describe('EnergyEquivalencyFormService', () => {
  let service: EnergyEquivalencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyEquivalencyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
