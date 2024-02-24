import { TestBed } from '@angular/core/testing';

import { BebidasFriasStockService } from './bebidas-frias-stock.service';

describe('BebidasFriasStockService', () => {
  let service: BebidasFriasStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasFriasStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
