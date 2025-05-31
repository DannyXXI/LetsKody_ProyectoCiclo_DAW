import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Juego } from '../../modelos/juegos-data';

@Component({
  selector: 'app-botones-juego',
  imports: [RouterLink, CommonModule],
  templateUrl: './botones-juego.component.html',
  styleUrl: './botones-juego.component.css',
})
export class BotonesJuegoComponent {

  // variables inputs que reciben los datos del componente padre MenuBotonesComponent
  @Input() items: Juego[] = [];
  @Input() userId = "";
  @Input() materia = "";
}
