import { TestBed } from '@angular/core/testing';

import { BusyhourService } from './busyhour.service';

describe('BusyhourService', () => {
  let service: BusyhourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusyhourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
