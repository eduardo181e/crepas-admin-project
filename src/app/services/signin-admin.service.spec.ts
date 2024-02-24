import { TestBed } from '@angular/core/testing';

import { SigninAdminService } from './signin-admin.service';

describe('SigninAdminService', () => {
  let service: SigninAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
