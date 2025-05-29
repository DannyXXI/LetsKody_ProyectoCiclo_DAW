import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';
import { RecaptchaService } from '../../servicios/gestion-recaptcha/recaptcha.service';
import { EmailService } from '../../servicios/email/email.service';

@Component({
  selector: 'app-formulario-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {

  public formularioRegistro:FormGroup;    // variable para el formulario
  public nombre:FormControl;              // variable para el campo del nombre completo
  public usuario:FormControl;             // variable para el campo del nombre de usuario
  public email:FormControl;               // variable para el campo de email
  public pass:FormControl;                // variable para el campo de contraseña
  public confirmPass:FormControl;         // variable para el campo de contraseña repetida
  public thirdParties:FormControl;        // variable para el checkbox opcional de terceros
  public terminos:FormControl;            // variable para el checkbox de terminos y licencias
  public regexNombre:RegExp;              // expresion regular para el nombre completo
  public regexUsuario:RegExp;             // expresion regular para el nombre de usuario
  public regexEmail:RegExp;               // expresion regular para el email
  public regexPass:RegExp;                // expresion regular para la contraseña
  public mensajeModal: string;            // variable para el mensaje de error

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor(public gestionUsuariosService:GestionUsuariosService, public recaptchaService:RecaptchaService, public emailService:EmailService, public router:Router) {
    this.nombre = new FormControl("");
    this.usuario = new FormControl("");
    this.email = new FormControl("");
    this.pass = new FormControl("");
    this.confirmPass = new FormControl("");
    this.thirdParties = new FormControl(false);
    this.terminos = new FormControl(false);
    this.formularioRegistro = new FormGroup({nombre:this.nombre, usuario:this.usuario, email:this.email, pass:this.pass, confirmPass:this.confirmPass, thirdParties:this.thirdParties, terms: this.terminos});
    this.regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,40}$/;
    this.regexUsuario = /^[a-z_0-9]{3,12}$/;
    this.regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,12}$/;
    this.mensajeModal = "";
  }

  // función que se ejecuta después de que la vista se haya inicializado
  ngAfterViewInit() {
    // se llama al render de reCAPTCHA cuando la vista ya está lista
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      grecaptcha.render(document.querySelector('.g-recaptcha') as HTMLElement, {
        sitekey: this.recaptchaService.siteKey
      });
    }
  }

  // metodo para enviar los datos del formulario
  public enviarFormularioRegistro(event: Event):void{
    const token = (window as any).grecaptcha.getResponse();  // token que genera el reCAPTCHA al ser seleccionado

    // si no estan rellenados los campos no se envia el formulario y salta un mensaje de aviso
    if(this.nombre.value.trim() == "" || this.usuario.value.trim() == "" || this.email.value.trim() == "" || this.pass.value.trim() == "" || this.confirmPass.value.trim() == ""){
      event.preventDefault();
      this.mostrarModal("Rellene todos los campos para poder registrarte.", "modalError");
    }
    // si el nombre completo no cumple con la expresion regular no se envia el formulario y salta un mensaje de error
    else if(!this.regexNombre.test(this.nombre.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para el nombre completo no es válido.", "modalError");
    }
    // si el nombre de usuario no cumple con la expresion regular no se envia el formulario y salta un mensaje de error
    else if(this.gestionUsuariosService.nombresUsuariosApp.includes(this.usuario.value.trim())){
      event.preventDefault();
      this.mostrarModal("El nombre de usuario ya existe, escoga otro.", "modalError");
    }
    // si el nombre de usuario ya esta registrado no se envia el formulario y salta un mensaje de error
    else if(!this.regexUsuario.test(this.usuario.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para el nombre de usuario no es válido.", "modalError");
    }
    // si el email no cumple con la expresion regular no se envia el formulario y salta un mensaje de error
    else if(!this.regexEmail.test(this.email.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para el email no es válido.", "modalError");
    }
    // si la contraseña no cumple con la expresion regular no se envia el formulario y salta un mensaje de error
    else if(!this.regexPass.test(this.pass.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para la contraseña no es válida.", "modalError");
    }
    // si ambas contraseñas no son exactamente iguales no se envia el formulario y salta un mensaje de error
    else if(this.pass.value.trim() !== this.confirmPass.value.trim()){
      event.preventDefault();
      this.mostrarModal("Las dos contraseñas deben ser exactamente iguales.", "modalError");
    }
    // si ambas contraseñas no son exactamente iguales no se envia el formulario y salta un mensaje de error
    else if(this.terminos.value !== true){
      event.preventDefault();
      this.mostrarModal("Debes aceptar los términos y licencias para poder registrarte.", "modalError");
    }
    // si el reCAPTCHA no esta seleccionado no se envia el formulario y salta un mensaje de aviso
    else if(token === ""){
      event.preventDefault();
      this.mostrarModal("Debes aceptar el reCAPTCHA para poder registrarte.", "modalError");
    }
    else{
      const datos = {token: token}; // se guarda el token generado en un objeto para su verificación en el servidor

      // realizamos la solicitud HTTP al servidor para tramitar la verificación del token
      this.recaptchaService.mandarTokenRecaptcha(datos).subscribe({
        next: (data) => {
          // se asignan los datos del formulario de registro a la variable del servicio hasta que el usuario se registre
          this.gestionUsuariosService.nuevoUsuario.nombreCompleto = this.nombre.value.trim();
          this.gestionUsuariosService.nuevoUsuario.usuario = this.usuario.value.trim();
          this.gestionUsuariosService.nuevoUsuario.email = this.email.value.trim();
          this.gestionUsuariosService.nuevoUsuario.password = this.pass.value.trim();
          this.gestionUsuariosService.nuevoUsuario.terceros = this.thirdParties.value;

          this.emailService.codigoVerificacion = this.emailService.generarCodigoVerificacion(); // generamos codigo de verificacion

          // agrupamos los datos necesarios para el email de verificacion en un objeto literal
          const datosEmailVerificacion = {email: this.email.value.trim() , codigo: this.emailService.codigoVerificacion};

          // realizamos la solicitud HTTP al servidor para mandar el email de verificacion al usuario
          this.emailService.mandarEmailVerificacion(datosEmailVerificacion).subscribe({
            next: (data) => {
              // limpiamos los campos y deseleccionamos los checkbox del formulario de registro
              this.formularioRegistro.setValue({nombre:"", usuario:"", email:"", pass:"", confirmPass:"", thirdParties:false, terms:false});
              (window as any).grecaptcha.reset();     // reiniciamos el reCAPTCHA
              this.router.navigate(["/validacion"]);  // redireccionamos a la ruta del componente de verificacion de codigo
            },
            error: (e) => {
              event.preventDefault();
              this.mostrarModal("Ups, ha ocurrido un error y no se ha podido procesar su solicitud.", "modalError"); 
              console.error(e);
            }
          });
        },
        error: (e) => {
          event.preventDefault();
          this.mostrarModal("Ups, ha ocurrido un error y no se ha podido procesar su solicitud.", "modalError"); 
          console.error(e);
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
