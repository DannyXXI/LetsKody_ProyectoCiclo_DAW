import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesJuegoComponent } from './botones-juego.component';

describe('BotonesJuegoComponent', () => {
  let component: BotonesJuegoComponent;
  let fixture: ComponentFixture<BotonesJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesJuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
