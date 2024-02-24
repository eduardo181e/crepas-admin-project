import { TestBed } from '@angular/core/testing';

import { BebidasFriasSalesService } from './bebidas-frias-sales.service';

describe('BebidasFriasSalesService', () => {
  let service: BebidasFriasSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasFriasSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
