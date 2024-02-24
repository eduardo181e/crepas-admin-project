import { TestBed } from '@angular/core/testing';

import { BebidasCalientesSalesGlobalService } from './bebidas-calientes-sales.service';

describe('BebidasCalientesSalesGlobalService', () => {
  let service: BebidasCalientesSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasCalientesSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
