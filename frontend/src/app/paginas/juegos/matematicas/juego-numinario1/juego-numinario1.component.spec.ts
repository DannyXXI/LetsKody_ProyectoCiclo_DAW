import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoNuminario1Component } from './juego-numinario1.component';

describe('JuegoNuminario1Component', () => {
  let component: JuegoNuminario1Component;
  let fixture: ComponentFixture<JuegoNuminario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoNuminario1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoNuminario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
