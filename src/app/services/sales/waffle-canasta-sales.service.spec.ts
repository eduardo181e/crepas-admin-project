import { TestBed } from '@angular/core/testing';

import { WaffleCanastaSalesService } from './waffle-canasta-sales.service';

describe('WaffleCanastaSalesService', () => {
  let service: WaffleCanastaSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleCanastaSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
