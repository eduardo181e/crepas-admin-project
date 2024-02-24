import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacturaComponent } from './view-factura.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { ActivatedRoute } from '@angular/router';

describe('ViewFacturaComponent', () => {
  let component: ViewFacturaComponent;
  let fixture: ComponentFixture<ViewFacturaComponent>;
  let alertService: jasmine.SpyObj<AlertDialogService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    alertService = jasmine.createSpyObj('AlertService', ['mostrarAlerta']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ViewFacturaComponent ],
      providers: [
        { provide: AlertDialogService, useValue: alertService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 123,
              },
            },
          },
        },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
