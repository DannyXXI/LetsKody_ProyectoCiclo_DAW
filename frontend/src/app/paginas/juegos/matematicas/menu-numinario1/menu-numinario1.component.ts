import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-numinario1',
  imports: [RouterLink],
  templateUrl: './menu-numinario1.component.html',
  styleUrl: './menu-numinario1.component.css'
})
export class MenuNuminario1Component {
  public userId: string;        // variable que contiene el parametro id de la URL

  // método constructor del componente (se inicializa variables y añadimos enrutadores)
  constructor(private route: ActivatedRoute) {
    this.userId = "";
  }

  ngOnInit() {
    // subscripcion de los parametros a la URL
    this.route.paramMap.subscribe((params) => {

      // obtenemos el parametro id de la URL
      const id = params.get("id") || "";
      this.userId = id;
    });
  }
}
