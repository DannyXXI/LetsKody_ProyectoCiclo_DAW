import { Component } from '@angular/core';
import { NavbarIndexComponent } from '../../componentes/navbar-index/navbar-index.component';
import { RedesSocialesComponent } from '../../componentes/redes-sociales/redes-sociales.component';

@Component({
  selector: 'app-faq',
  imports: [NavbarIndexComponent, RedesSocialesComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

}
