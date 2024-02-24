import { TestBed } from '@angular/core/testing';

import { WaffleSalesService } from './waffle-sales.service';

describe('WaffleSalesService', () => {
  let service: WaffleSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
