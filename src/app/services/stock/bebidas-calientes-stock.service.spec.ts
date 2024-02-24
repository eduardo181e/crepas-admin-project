import { TestBed } from '@angular/core/testing';

import { BebidasCalientesStockService } from './bebidas-calientes-stock.service';

describe('BebidasCalientesStockService', () => {
  let service: BebidasCalientesStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasCalientesStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
