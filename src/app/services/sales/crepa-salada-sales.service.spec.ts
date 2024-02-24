import { TestBed } from '@angular/core/testing';

import { CrepaSaladaSalesService } from './crepa-salada-sales.service';

describe('CrepaSaladaSalesService', () => {
  let service: CrepaSaladaSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaSaladaSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
