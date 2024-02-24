import { TestBed } from '@angular/core/testing';

import { CrepaDulceSalesService } from './crepa-dulce-sales.service';

describe('CrepaDulceSalesService', () => {
  let service: CrepaDulceSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaDulceSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
