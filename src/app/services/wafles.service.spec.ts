import { TestBed } from '@angular/core/testing';

import { WaflesService } from './wafles.service';

describe('WaflesService', () => {
  let service: WaflesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaflesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
