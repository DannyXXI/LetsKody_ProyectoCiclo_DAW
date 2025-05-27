import { Component } from '@angular/core';
import { EmailService } from '../../servicios/email/email.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  imports: [RouterLink],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {

  // método constructor del componente (se inicializa variables y añadimos servicios)
  constructor(public emailService:EmailService) {
    
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
}
