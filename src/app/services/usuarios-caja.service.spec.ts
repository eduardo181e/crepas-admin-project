import { TestBed } from '@angular/core/testing';

import { UsuariosCajaService } from './usuarios-caja.service';

describe('UsuariosCajaService', () => {
  let service: UsuariosCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
