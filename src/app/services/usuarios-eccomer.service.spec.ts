import { TestBed } from '@angular/core/testing';

import { UsuariosEccomerService } from './usuarios-eccomer.service';

describe('UsuariosEccomerService', () => {
  let service: UsuariosEccomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosEccomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
