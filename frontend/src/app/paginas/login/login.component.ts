import { Component, OnInit } from '@angular/core';
import { NavbarIndexComponent } from '../../componentes/navbar-index/navbar-index.component';
import { RedesSocialesComponent } from '../../componentes/redes-sociales/redes-sociales.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';

@Component({
  selector: 'app-login',
  imports: [NavbarIndexComponent, RedesSocialesComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public mensajeModal: string;  // variable para el mensaje de error
  public formularioLogin: FormGroup;  // variable para el formulario
  public user: FormControl;     // varaible para el campo de usuario
  public pass: FormControl;        // variable para el campo de contraseña

  // método constructor del componente (inicializa variables, añadimos servicios y enrutadores)
  constructor(public serviciosUsuario:GestionUsuariosService, public router:Router){
    this.mensajeModal = "";
    this.user = new FormControl("");
    this.pass = new FormControl("");
    this.formularioLogin = new FormGroup({ user:this.user , pass:this.pass });
  }

   // al iniciar la app que obtenga todos nombres e ids de usuarios
  ngOnInit(){
    this.serviciosUsuario.obtenerNombresUsuario();
    this.serviciosUsuario.obtenerIdsUsuario();
  }

  // metodo para enviar los datos del formulario
  public hacerLogin(event:Event){
    // si no estan rellenados los campos no se envia el formulario y salta un mensaje de aviso
    if(this.user.value.trim() == "" || this.pass.value.trim() == "" ){
      event.preventDefault();
      this.mostrarModal("Rellene todos los campos para iniciar sesion.", "modalError");
    }
    else{
      const datos = {user: this.user.value.trim(), pass: this.pass.value.trim()}; // almacenamos el valor de los campos en un objeto literal

      // realizamos la solicitud HTTP al servidor para verificar las credenciales para el login
      this.serviciosUsuario.verificarLogin(datos).subscribe({
        next: (data) => {
          // si no existe el usuario o contraseña es incorrecta que muestra un mensaje y no envie el formulario
          if(data.mensajeError){
            event.preventDefault();
            this.mostrarModal(data.mensajeError, "modalError");  
          }
          else{
            // si fue todo bien, añadimos los datos a la interfaz
            this.serviciosUsuario.usuario.id = data.id;
            this.serviciosUsuario.usuario.nombreCompleto = data.nombreCompleto;
            this.serviciosUsuario.usuario.nombreUsuario = data.nombreUsuario;
            this.serviciosUsuario.usuario.email = data.email;
            this.serviciosUsuario.usuario.terceros = data.terceros;
            this.serviciosUsuario.usuario.puntosBanderas = 0;
            this.serviciosUsuario.usuario.puntosTabla = 0;
            
            this.formularioLogin.setValue({ user:"" , pass:"" });    // limpiamos el formulario

            this.router.navigate(["usuario/" + data.id + "/menu"]);  // redireccionamos a la pagina del menu del usuario
          }
        },
        error: (e) => {
          console.error("Error al hacer login", e);
          this.mostrarModal("Ups, algo ha ocurrido al iniciar sesión.", "modalError");
        }
      });
    }
  }

  // metodo para mostrar los mensajes en el modal
  public mostrarModal(mensaje:string, nombreClase:string) {
    const dialog = document.getElementById("modal") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeModal = mensaje;
    dialog.className= nombreClase;
    dialog.showModal();
  }

}
