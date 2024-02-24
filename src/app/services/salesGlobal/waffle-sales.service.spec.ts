import { TestBed } from '@angular/core/testing';

import { WaffleSalesGlobalService } from './waffle-sales.service';

describe('WaffleSalesGlobalService', () => {
  let service: WaffleSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
