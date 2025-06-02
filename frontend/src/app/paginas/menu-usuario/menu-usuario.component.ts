import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';

@Component({
  selector: 'app-menu-usuario',
  imports: [RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent implements OnInit {

  public idParam:string;           // variable del parametro id de la ruta parametrizada de la pagina
  public mensajeModal: string;            // variable para el mensaje de error

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public serviceUsuarios:GestionUsuariosService, public router:Router, public activeRoute:ActivatedRoute) {
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
    this.mensajeModal = "";
  }

  ngOnInit(){
    this.cargarDatosUsuario(this.idParam); // comprobar al inicio si el parametro del id del usuario es válido
  }

  // funcion para cargar los datos del usuario
  public cargarDatosUsuario(idString: string):void {
    const idNum = Number(idString);

    // si el parametro tiene letras, es un 0 o no esta entre las ids registradas se vuelve al login
    if((/\D/).test(idString) || idString === "0" || !this.serviceUsuarios.idsUsuariosApp.includes(idNum) || this.serviceUsuarios.usuario.id === 0){
      this.router.navigate(['/login']);
    }
  }

  // metodo para mostrar los mensajes en el modal
  public mostrarModal(mensaje:string, nombreClase:string) {
    const dialog = document.getElementById("modal") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = mensaje;
    dialog.className= nombreClase;
    dialog.showModal();
  }

  //funcion que cierra la sesion (limpiamos los datos de la interfaz) y se redirecciona al login
  public cerrarSesion():void {
    this.serviceUsuarios.usuario = {id:0, nombreCompleto:"", nombreUsuario:"", email:"", terceros:false, puntosBanderas:0, puntosTabla:0};
    this.router.navigate(["/login"]); // se redirecciona a la pagina del login
  }

  // metodo para mostrar los mensajes en el modal
  public mostrarMensajeModal() {
    const dialog = document.getElementById("modal2") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = "Función no disponible en esta versión, pongase en contacto con el autor.";
    dialog.className= "modalMensaje";
    dialog.showModal();
  }
}
