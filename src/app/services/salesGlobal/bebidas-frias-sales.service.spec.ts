import { TestBed } from '@angular/core/testing';

import { BebidasFriasSalesGlobalService } from './bebidas-frias-sales.service';

describe('BebidasFriasSalesGlobalService', () => {
  let service: BebidasFriasSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasFriasSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
