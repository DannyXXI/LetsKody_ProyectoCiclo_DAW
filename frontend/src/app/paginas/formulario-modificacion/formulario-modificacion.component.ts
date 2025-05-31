import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GestionUsuariosService } from '../../servicios/gestion-usuarios/gestion-usuarios.service';
import { RecaptchaService } from '../../servicios/gestion-recaptcha/recaptcha.service';
import { EmailService } from '../../servicios/email/email.service';

@Component({
  selector: 'app-formulario-modificacion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './formulario-modificacion.component.html',
  styleUrl: './formulario-modificacion.component.css'
})
export class FormularioModificacionComponent {
  public formularioUpdate:FormGroup;      // variable para el formulario
  public usuario:FormControl;             // variable para el campo del nombre de usuario
  public email:FormControl;               // variable para el campo de email
  public lastPass:FormControl;                // variable para el campo de contraseña antigua
  public newPass:FormControl;                // variable para el campo de contraseña nueva
  public thirdParties:FormControl;        // variable para el checkbox opcional de terceros
  public regexUsuario:RegExp;             // expresion regular para el nombre de usuario
  public regexEmail:RegExp;               // expresion regular para el email
  public regexPass:RegExp;                // expresion regular para la contraseña
  public mensajeModal: string;            // variable para el mensaje de error
  public idParam:string;             // variable del parametro id de la ruta parametrizada de la pagina

  public datosEmailVerificacion = {email: "" , codigo: ""};  // variable con los datos necesarios para el email de verificacion

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public gestionUsuariosService:GestionUsuariosService, public recaptchaService:RecaptchaService, public emailService:EmailService, public router:Router, public activeRoute:ActivatedRoute) {
    this.usuario = new FormControl(this.gestionUsuariosService.usuario.nombreUsuario);
    this.email = new FormControl(this.gestionUsuariosService.usuario.email);
    this.lastPass = new FormControl("");
    this.newPass = new FormControl("");
    this.thirdParties = new FormControl(this.gestionUsuariosService.usuario.terceros);
    this.formularioUpdate = new FormGroup({usuario:this.usuario, email:this.email, lastPass:this.lastPass, newPass:this.newPass, thirdParties:this.thirdParties});
    this.regexUsuario = /^[a-z_0-9]{3,12}$/;
    this.regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,12}$/;
    this.mensajeModal = "";
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
  }

  ngOnInit(){
    this.cargarDatosUsuario(this.idParam); // comprobar al inicio si el parametro del id del usuario es válido
  }

  // funcion para cargar los datos del usuario
  public cargarDatosUsuario(idString: string):void {
    const idNum = Number(idString);

    // si el parametro tiene letras, es un 0 o no esta entre las ids registradas se vuelve al login
    if((/\D/).test(idString) || idString === "0" || !this.gestionUsuariosService.idsUsuariosApp.includes(idNum) || this.gestionUsuariosService.usuario.id === 0){
      this.router.navigate(['/login']);
    }
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
  public enviarFormularioUpdate(event: Event):void{
    const token = (window as any).grecaptcha.getResponse();  // token que genera el reCAPTCHA al ser seleccionado

    // si el input del usuario no cumple con el formato no se envia el formulario y salta un mensaje de aviso
    if(!this.regexUsuario.test(this.usuario.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para el nombre de usuario no es válido.", "modalError");
    }
    // si el NUEVO nombre del usuario ya esta registrado no se envia el formulario y salta un mensaje de aviso
    else if(this.usuario.value.trim() !== this.gestionUsuariosService.usuario.nombreUsuario && this.gestionUsuariosService.nombresUsuariosApp.includes(this.usuario.value.trim())){
      event.preventDefault();
      this.mostrarModal("El nombre de usuario ya existe, escoga otro.", "modalError");
    }
    // si el input del email no esta vacio y no cumple con el formato no se envia el formulario y salta un mensaje de aviso
    else if(this.email.value.trim() !== "" && !this.regexEmail.test(this.email.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para el email no es válido.", "modalError");
    }
    // si solo el input de contraseña nueva no esta vacio no se envia el formulario y salta un mensaje de aviso
    else if(this.lastPass.value.trim() == "" && this.newPass.value.trim() !== ""){
      event.preventDefault();
      this.mostrarModal("Para modificar su contraseña debe introducir su anterior contraseña.", "modalError");
    }
    // si el input de nueva contraseña no cumple con el formato no se envia el formulario y salta un mensaje de aviso
    else if(this.lastPass.value.trim() !== "" && !this.regexPass.test(this.newPass.value.trim())){
      event.preventDefault();
      this.mostrarModal("El valor para la contraseña nueva no es válido.", "modalError");
    }
    // si el reCAPTCHA no esta seleccionado no se envia el formulario y salta un mensaje de aviso
    else if(token === ""){
      event.preventDefault();
      this.mostrarModal("Debes aceptar el reCAPTCHA para poder modificar tus datos.", "modalError");
    }
    else{
      const datos = {token: token}; // se guarda el token generado en un objeto para su verificación en el servidor

      // realizamos la solicitud HTTP al servidor para tramitar la verificación del token
      this.recaptchaService.mandarTokenRecaptcha(datos).subscribe({
        next: (data) => {
          // se asignan los datos del formulario de modificacion a la variable del servicio hasta que el usuario sea verificado
          this.gestionUsuariosService.updateUsuario.id = this.gestionUsuariosService.usuario.id;
          this.gestionUsuariosService.updateUsuario.nombreCompleto = this.gestionUsuariosService.usuario.nombreCompleto;
          this.gestionUsuariosService.updateUsuario.nombreUsuario = this.usuario.value.trim();
          this.gestionUsuariosService.updateUsuario.email = this.email.value.trim();
          this.gestionUsuariosService.updateUsuario.lastPass = this.lastPass.value.trim();
          this.gestionUsuariosService.updateUsuario.newPass = this.newPass.value.trim();
          this.gestionUsuariosService.updateUsuario.terceros = this.thirdParties.value;

          this.emailService.codigoVerificacion = this.emailService.generarCodigoVerificacion(); // generamos codigo de verificacion

          // agrupamos los datos necesarios para el email de verificacion en un objeto literal en funcion si se ha cambiado el email
          if(this.gestionUsuariosService.usuario.email === this.email.value.trim()){
            this.datosEmailVerificacion = {email: this.gestionUsuariosService.usuario.email , codigo: this.emailService.codigoVerificacion};
          }
          else{
            this.datosEmailVerificacion = {email: this.email.value.trim() , codigo: this.emailService.codigoVerificacion};
          }

          // realizamos la solicitud HTTP al servidor para mandar el email de verificacion al usuario
          this.emailService.mandarEmailVerificacionUpdate(this.datosEmailVerificacion).subscribe({
            next: (data) => {
              // limpiamos los campos y deseleccionamos el checkbox del formulario
              this.formularioUpdate.setValue({usuario:"", email:"", lastPass:"", newPass:"", thirdParties:false});
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
