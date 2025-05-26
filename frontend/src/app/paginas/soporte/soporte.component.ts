import { Component } from '@angular/core';
import { NavbarIndexComponent } from '../../componentes/navbar-index/navbar-index.component';
import { RedesSocialesComponent } from '../../componentes/redes-sociales/redes-sociales.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmailSoporte } from '../../modelos/email-soporte';
import { EmailService } from '../../servicios/email/email.service';

@Component({
  selector: 'app-soporte',
  imports: [NavbarIndexComponent, RedesSocialesComponent, ReactiveFormsModule],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

  public formularioSoporte: FormGroup;  // variable para el formulario
  public destinatario: FormControl;     // varaible para el campo de destinatario
  public contenido: FormControl;        // variable para el campo de contenido
  public regexEmail: RegExp;            // expresion regular para el email
  public mensajeModal: string;          // variable para el mensaje de error
  public datosEmail: EmailSoporte;      // variable con los datos del email que se enviaran al servidor

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor(public emailService:EmailService) {
    this.destinatario = new FormControl("");
    this.contenido = new FormControl("");
    this.formularioSoporte = new FormGroup({ destinatario:this.destinatario , contenido:this.contenido });
    this.regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.mensajeModal = "";
    this.datosEmail = { destinatario:"" , contenido:"" , token:"" };
  }

  // función que se ejecuta después de que la vista se haya inicializado
  ngAfterViewInit() {
    // se llama al render de reCAPTCHA cuando la vista ya está lista
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      grecaptcha.render(document.querySelector('.g-recaptcha') as HTMLElement, {
        sitekey: this.emailService.siteKey
      });
    }
  }

  // metodo para enviar los datos del formulario
  public enviarEmailSoporte(event: Event):void{
    const token = (window as any).grecaptcha.getResponse();  // token que genera el reCAPTCHA al ser seleccionado

    // si no estan rellenados los campos no se envia el formulario y salta un mensaje de aviso
    if(this.destinatario.value.trim() == "" || this.contenido.value.trim() == "" ){
      event.preventDefault();
      this.mostrarModal("Rellene todos los campos para poder enviar su solicitud.", "modalError");
    }
    // si el email no cumple con la expresion regular no se envia el formulario y salta un mensaje de aviso
    else if(!this.regexEmail.test(this.destinatario.value.trim())){
      event.preventDefault();
      this.mostrarModal("El formato del email destinatario no es válido.", "modalError");
    }
    // si el contenido del mensaje sobrepasa los 70 caracteres no se envia el formulario y salta un mensaje de aviso
    else if(this.contenido.value.trim().length > 70){
      event.preventDefault();
      this.mostrarModal("El contenido de su solicitud es demasiado larga para ser enviada.", "modalError");
    }
    // si el email no cumple con la expresion regular no se envia el formulario y salta un mensaje de aviso
    else if(token === ""){
      event.preventDefault();
      this.mostrarModal("Debe aceptar el reCAPTCHA para poder enviar la solicitud.", "modalError");
    }
    // si todo esta bien se procede a mandar los datos al servidor
    else{
      // se asignan los datos del email al objeto que se mandara al servidor
      this.datosEmail.destinatario = this.destinatario.value.trim();
      this.datosEmail.contenido = this.contenido.value.trim();
      this.datosEmail.token = token;

      // realizamos la solicitud HTTP al servidor para tramitar el email de soporte
      this.emailService.mandarEmailSoporte(this.datosEmail).subscribe({
        next: (data) => {
          this.mostrarModal("La solicitud ha sido mandada correctamente.\nLe llegará un resgaurdo de su solicitud a su email.", "modalCorrect");
          this.formularioSoporte.setValue({destinatario:"" , contenido:""}); // reiniciamos los valores del formulario
          (window as any).grecaptcha.reset(); // reiniciamos el reCAPTCHA
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
