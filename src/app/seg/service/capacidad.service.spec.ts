import { TestBed } from '@angular/core/testing';

import { CapacidadService } from './capacidad.service';

describe('CapacidadService', () => {
  let service: CapacidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
