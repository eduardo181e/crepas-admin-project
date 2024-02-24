import { TestBed } from '@angular/core/testing';

import { CrepaSaladaSalesGlobalService } from './crepa-salada-sales.service';

describe('CrepaSaladaSalesGlobalService', () => {
  let service: CrepaSaladaSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaSaladaSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
