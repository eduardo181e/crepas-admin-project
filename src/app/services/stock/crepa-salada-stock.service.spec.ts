import { TestBed } from '@angular/core/testing';

import { CrepaSaladaStockService } from './crepa-salada-stock.service';

describe('CrepaSaladaStockService', () => {
  let service: CrepaSaladaStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaSaladaStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
