import { TestBed } from '@angular/core/testing';

import { CrepaDulceStockService } from './crepa-dulce-stock.service';

describe('CrepaDulceStockService', () => {
  let service: CrepaDulceStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaDulceStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
