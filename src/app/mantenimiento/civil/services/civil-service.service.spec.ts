import { TestBed } from '@angular/core/testing';

import { CivilServiceService } from './civil-service.service';

describe('CivilServiceService', () => {
  let service: CivilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CivilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
