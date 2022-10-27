import { TestBed } from '@angular/core/testing';

import { ThresholdsKpiService } from './thresholds-kpi.service';

describe('ThresholdsKpiService', () => {
  let service: ThresholdsKpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThresholdsKpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
