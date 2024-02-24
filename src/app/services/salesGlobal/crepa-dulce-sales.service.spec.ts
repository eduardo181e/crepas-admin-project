import { TestBed } from '@angular/core/testing';

import { CrepaDulceSalesGlobalService } from './crepa-dulce-sales.service';

describe('CrepaDulceSalesGlobalService', () => {
  let service: CrepaDulceSalesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaDulceSalesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
