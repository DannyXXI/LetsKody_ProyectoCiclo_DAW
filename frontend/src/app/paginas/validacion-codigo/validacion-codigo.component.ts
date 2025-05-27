import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-validacion-codigo',
  imports: [RouterLink, FormsModule],
  templateUrl: './validacion-codigo.component.html',
  styleUrl: './validacion-codigo.component.css'
})
export class ValidacionCodigoComponent {

  public codigoVerificacion:string;          // codigo de verificación escrito por el usuario
  public codigoVerificaciónEnviado:string;   // codigo de verificacion que fue enviado al email del usuario
  public emailUsuario:string;                // email del usuario al que se le ha mandado el codigo de verificacion

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor() {
    this.codigoVerificacion = "";
    this.codigoVerificaciónEnviado = "1234abcd";
    this.emailUsuario = "ejemplo@correo.com"
  }

  // metodo para comprobar los caracteres que se escriben el input
  public caracteresValidos(event: Event) {
    const input = event.target as HTMLInputElement;       // se obtiene la referencia al input que genera el evento
    input.value = input.value.replace(/[^a-z0-9]/g, '');  // se admiten los caracteres [a-z] y [0-9], el resto no se añaden
    this.codigoVerificacion = input.value;                // se actualiza el valor de la variable con el valor del input
  }

  // metodo para enviar los datos del formulario
  public comprobarCodigo(event: Event) {
    if(this.codigoVerificacion === this.codigoVerificaciónEnviado) {
      console.log("Codigo verificado :)");
    }
    else {
      console.log("Codigo no verificado :(");
      event.preventDefault();
    }
  }
}
