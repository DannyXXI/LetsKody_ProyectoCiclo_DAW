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
  public mensajeModal: string;            // variable para el mensaje de error

  // método constructor del componente (se inicializa variables y añadimos enrutadores)
  constructor(private route: ActivatedRoute) {
    this.userId = "";
    this.mensajeModal = "";
  }

  ngOnInit() {
    // subscripcion de los parametros a la URL
    this.route.paramMap.subscribe((params) => {

      // obtenemos el parametro id de la URL
      const id = params.get("id") || "";
      this.userId = id;
    });
  }

  // metodo para mostrar el modal de bloqueo de funciones
  public mostrarMensajeModal() {
    const dialog = document.getElementById("modal") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = "Función no disponible en esta versión, pongase en contacto con el autor.";
    dialog.className= "modalMensaje";
    dialog.showModal();
  }
}
