import { TestBed } from '@angular/core/testing';

import { UbigeoServiceService } from './ubigeo-service.service';

describe('UbigeoServiceService', () => {
  let service: UbigeoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbigeoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
