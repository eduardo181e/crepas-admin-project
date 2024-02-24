import { TestBed } from '@angular/core/testing';

import { WaffleCanastaSalesGlobalService } from './waffle-canasta-sales.service';

describe('WaffleCanastaSalesGlobalService', () => {
  let service: WaffleCanastaSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleCanastaSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
