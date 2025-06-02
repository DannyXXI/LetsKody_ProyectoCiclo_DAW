import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoEuroBanderasComponent } from './juego-euro-banderas.component';

describe('JuegoEuroBanderasComponent', () => {
  let component: JuegoEuroBanderasComponent;
  let fixture: ComponentFixture<JuegoEuroBanderasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoEuroBanderasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoEuroBanderasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
