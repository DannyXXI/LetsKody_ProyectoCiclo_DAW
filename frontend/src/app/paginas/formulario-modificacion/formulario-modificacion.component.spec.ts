import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModificacionComponent } from './formulario-modificacion.component';

describe('FormularioModificacionComponent', () => {
  let component: FormularioModificacionComponent;
  let fixture: ComponentFixture<FormularioModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioModificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
