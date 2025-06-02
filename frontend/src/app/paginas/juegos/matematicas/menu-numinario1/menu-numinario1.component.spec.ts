import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNuminario1Component } from './menu-numinario1.component';

describe('MenuNuminario1Component', () => {
  let component: MenuNuminario1Component;
  let fixture: ComponentFixture<MenuNuminario1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNuminario1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuNuminario1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
