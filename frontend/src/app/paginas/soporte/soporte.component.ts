import { Component } from '@angular/core';
import { NavbarIndexComponent } from '../../componentes/navbar-index/navbar-index.component';
import { RedesSocialesComponent } from '../../componentes/redes-sociales/redes-sociales.component';

@Component({
  selector: 'app-soporte',
  imports: [NavbarIndexComponent, RedesSocialesComponent],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

}
