import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEuroBanderasComponent } from './menu-euro-banderas.component';

describe('MenuEuroBanderasComponent', () => {
  let component: MenuEuroBanderasComponent;
  let fixture: ComponentFixture<MenuEuroBanderasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEuroBanderasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEuroBanderasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
