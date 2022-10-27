import { TestBed } from '@angular/core/testing';

import { NeiranMonitoreoService } from './neiran-monitoreo.service';

describe('NeiranMonitoreoService', () => {
  let service: NeiranMonitoreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeiranMonitoreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
