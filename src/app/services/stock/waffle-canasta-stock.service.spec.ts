import { TestBed } from '@angular/core/testing';

import { WaffleCanastaStockService } from './waffle-canasta-stock.service';

describe('WaffleCanastaStockService', () => {
  let service: WaffleCanastaStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleCanastaStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
