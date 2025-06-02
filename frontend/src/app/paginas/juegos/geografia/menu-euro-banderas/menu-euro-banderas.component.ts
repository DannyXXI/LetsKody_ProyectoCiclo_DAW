import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EurobanderasService } from '../../../../servicios/juegos/geografia/eurobanderas/eurobanderas.service';

@Component({
  selector: 'app-menu-euro-banderas',
  imports: [RouterLink],
  templateUrl: './menu-euro-banderas.component.html',
  styleUrl: './menu-euro-banderas.component.css'
})
export class MenuEuroBanderasComponent {

  public userId: string;        // variable que contiene el parametro id de la URL

  // método constructor del componente (se inicializa variables y añadimos enrutadores)
  constructor(public serviceEuroBanderas:EurobanderasService ,private route: ActivatedRoute) {
    this.userId = "";
  }

  ngOnInit() {
    // subscripcion de los parametros a la URL
    this.route.paramMap.subscribe((params) => {

      // obtenemos el parametro id de la URL
      const id = params.get("id") || "";
      this.userId = id;
    });

    this.serviceEuroBanderas.obtenerDatosBanderas();
  }
}
