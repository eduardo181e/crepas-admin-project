import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service'; // Importar el servicio
describe('TranslatePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatePipe, TranslateService] // Agregar ambos a los providers
    });
  });

  // ... tus pruebas aquí
  it('create an instance', () => {
    const pipe = TestBed.inject(TranslatePipe); // Obtener la instancia del pipe
    expect(pipe).toBeTruthy();
  });
});