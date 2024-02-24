import { TestBed } from '@angular/core/testing';

import { WafflesStockService } from './waffles-stock.service';

describe('WafflesStockService', () => {
  let service: WafflesStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WafflesStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
