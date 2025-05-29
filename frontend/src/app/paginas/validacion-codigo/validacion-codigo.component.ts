import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';
import { EmailService } from '../../servicios/email/email.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-validacion-codigo',
  imports: [FormsModule],
  templateUrl: './validacion-codigo.component.html',
  styleUrl: './validacion-codigo.component.css'
})
export class ValidacionCodigoComponent implements OnInit{

  public codigoVerificacion:string;          // codigo de verificación escrito por el usuario
  public emailUsuario:string;                // email del usuario al que se le ha mandado el codigo de verificacion
  public mensajeModal:string;                // variable para el mensaje del modal

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor(public gestionUsuariosService:GestionUsuariosService, public emailService:EmailService, public router:Router, private location: Location) {
    this.codigoVerificacion = "";
    this.emailUsuario = this.gestionUsuariosService.nuevoUsuario.email;
    this.mensajeModal = "";
  }

  ngOnInit() {
    if(!this.emailUsuario) {
      this.router.navigate(["/"]); // si no existe un email al que se haya mandado el codigo se redirecciona al home
    }
  }

  // metodo para comprobar los caracteres que se escriben el input
  public caracteresValidos(event: Event) {
    const input = event.target as HTMLInputElement;       // se obtiene la referencia al input que genera el evento
    input.value = input.value.replace(/[^a-z0-9]/g, '');  // se admiten los caracteres [a-z] y [0-9], el resto no se añaden
    this.codigoVerificacion = input.value;                // se actualiza el valor de la variable con el valor del input
  }

  // metodo para enviar los datos del formulario
  public comprobarCodigo(event: Event) {
    // comprobamos si se ha introducido exactamente el codigo de verificacion
    if(this.codigoVerificacion === this.emailService.codigoVerificacion) {
      
      // realizamos la solicitud HTTP al servidor para registrar el usuario
      this.gestionUsuariosService.registrarUsuario(this.gestionUsuariosService.nuevoUsuario).subscribe({
        next: (data) => {
          this.mostrarModal("modalUnBoton", "Usuario registrado satisfactoriamente.\nSe le ha mandado a su email sus datos de acceso.", "modalCorrect");
          this.gestionUsuariosService.obtenerNombresUsuario();  // actualizamos la lista de nombres de usuarios
          this.gestionUsuariosService.nuevoUsuario = {nombreCompleto:"", usuario:"", email:"", password:"", terceros:false}; // limpiamos la interfaz de datos de registro
        },
        error: (e) => {
          this.mostrarModal("modalError", "Ups, ha ocurrido un error y no se ha podido procesar el registro.", "modalError"); 
          console.error(e);
        }
      });
    }
    else {
      this.mostrarModal("modalError", "Código de verificación no válido.", "modalError");
      event.preventDefault();
    }
  }

  // metodo para volver a la página anterior (formulario de registro/modificacion)
  public volverAtras() {
    this.location.back(); 
  }

  // metodo para mostrar el modal al pulsar el boton de ir atrás
  public volver() {
    this.mostrarModal("modalDosBotones", this.mensajeModal, "modalInfo");
  }

  // metodo para mostrar el tipo de modal
  public mostrarModal(id:string, mensaje:string, nombreClase:string) {
    const dialog = document.getElementById(id) as HTMLDialogElement;  // referencia al modal por su ID

    // se le asigna el texto del modal en función del tipo de modal y su funcion
    if(this.gestionUsuariosService.nuevoUsuario.email && nombreClase=="modalInfo"){
      this.mensajeModal = "Si decide salir de la pantalla, no se completará el proceso de registro.";
    }
    else if(nombreClase=="modalInfo"){
      this.mensajeModal = "Si decide salir de la pantalla, no se guardaran los cambios en el usuario.";
    }
    else{
      this.mensajeModal = mensaje;
    }
    
    dialog.className= nombreClase;
    dialog.showModal();
  }
}