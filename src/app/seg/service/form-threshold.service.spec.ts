import { TestBed } from '@angular/core/testing';

import { FormThresholdService } from './form-threshold.service';

describe('FormThresholdService', () => {
  let service: FormThresholdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormThresholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
