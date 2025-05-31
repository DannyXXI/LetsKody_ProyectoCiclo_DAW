import { Component } from '@angular/core';
import { BotonesJuegoComponent } from "../../componentes/botones-juego/botones-juego.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Juego, juegosPorMateria, nombreVisibleMateria } from '../../modelos/juegos-data';

@Component({
  selector: 'app-menu-juegos',
  imports: [BotonesJuegoComponent, RouterLink],
  templateUrl: './menu-juegos.component.html',
  styleUrl: './menu-juegos.component.css'
})
export class MenuJuegosComponent {

  public juegos: Juego[];          // variable que contiene la lista de juegos actual
  public idUsuario: string;        // variable que contiene el parametro id de la URL
  public materia: string;          // varaible que contiene el nombre interno de la materia
  public nombreCategoria: string;  // variable que contiene el nombre visible

  // método constructor del componente (se inicializa variables y añadimos enrutadores)
  constructor(private route: ActivatedRoute) {
    this.juegos = [];
    this.idUsuario = "";
    this.materia = "";
    this.nombreCategoria = "";
  }

  ngOnInit() {
    // subscripcion de los parametros a la URL
    this.route.paramMap.subscribe((params) => {
      // obtenemos el parametro id de la URL
      const id = params.get('id') || '';
      this.idUsuario = id;

      // obtenemos la informacion del parametro materia de la URL
      const materia = params.get("materia") || "";
      this.materia = materia;

      // obtenemos el array de juegos según la materia
      this.juegos = juegosPorMateria[materia] || [];

      // obtenemos el nombre visible (con tildes) de la materia
      this.nombreCategoria = nombreVisibleMateria[materia] || materia;
    });
  }
}
