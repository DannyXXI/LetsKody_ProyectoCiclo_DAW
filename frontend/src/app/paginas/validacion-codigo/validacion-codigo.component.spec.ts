import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionCodigoComponent } from './validacion-codigo.component';

describe('ValidacionCodigoComponent', () => {
  let component: ValidacionCodigoComponent;
  let fixture: ComponentFixture<ValidacionCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionCodigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
