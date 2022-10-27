import { TestBed } from '@angular/core/testing';

import { FormThresholdsKpiService } from './form-thresholds-kpi.service';

describe('FormThresholdsKpiService', () => {
  let service: FormThresholdsKpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormThresholdsKpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
