import { TestBed } from '@angular/core/testing';

import { BebidasCalientesSalesService } from './bebidas-calientes-sales.service';

describe('BebidasCalientesSalesService', () => {
  let service: BebidasCalientesSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasCalientesSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
