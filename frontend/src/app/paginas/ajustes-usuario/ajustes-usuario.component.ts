import { Component, OnInit } from '@angular/core';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RankingUsuarioService } from '../../servicios/ranking-usuario/ranking-usuario.service';

@Component({
  selector: 'app-ajustes-usuario',
  imports: [RouterLink],
  templateUrl: './ajustes-usuario.component.html',
  styleUrl: './ajustes-usuario.component.css'
})
export class AjustesUsuarioComponent implements OnInit {

  public idParam:string;             // variable del parametro id de la ruta parametrizada de la pagina
  public mensajeModal: string;       // variable para el mensaje del modal

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public serviceUsuarios:GestionUsuariosService, public serviceRanking:RankingUsuarioService, public router:Router, public activeRoute:ActivatedRoute) {
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
    this.mensajeModal = "";
  }

  ngOnInit(){
    this.cargarDatosUsuario(this.idParam); // comprobar al inicio si el parametro del id del usuario es válido
    this.serviceRanking.obtenerPuntuacionUsuario(this.idParam);  // obtenemos las puntuaciones del usuario
  }

  // funcion para cargar los datos del usuario
  public cargarDatosUsuario(idString: string):void {
    const idNum = Number(idString);

    // si el parametro tiene letras, es un 0 o no esta entre las ids registradas se vuelve al login
    if((/\D/).test(idString) || idString === "0" || !this.serviceUsuarios.idsUsuariosApp.includes(idNum) || this.serviceUsuarios.usuario.id === 0){
      this.router.navigate(['/login']);
    }
  }

  // metodo para mostrar el modal
  public mostrarModal(mensaje:string, nombreClase:string):void {
    const dialog = document.getElementById("modal") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = mensaje;
    dialog.className= nombreClase;
    dialog.showModal();
  }

  //metodo para eliminar la cuenta y redireccionar al login
  public eliminarCuenta():void {
    alert("Función no disponible en esta versión, pongase en contacto con el autor.")
  }

    // metodo para mostrar el modal de bloqueo de funciones
  public mostrarMensajeModal() {
    const dialog = document.getElementById("modal2") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = "Función no disponible en esta versión, pongase en contacto con el autor.";
    dialog.className= "modalMensaje";
    dialog.showModal();
  }
}
