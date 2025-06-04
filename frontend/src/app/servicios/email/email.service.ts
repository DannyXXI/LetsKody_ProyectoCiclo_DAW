import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailSoporte } from '../../modelos/email-soporte';
import { Observable } from 'rxjs';
import { ConfigService } from '../configuracion/config.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public siteKey: string;               // clave pública de Google reCAPTCHA v2
  public codigoVerificacion: string;    // variable para el codigo de verificacion de registro/modificacion de usuario

  // método constructor del servicio (se inicializa variables y añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {
    this.siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv";
    this.codigoVerificacion = "";
  }

  // metodo para generar el codigo de verificacion aleatoriamente
  public generarCodigoVerificacion(): string {
    let resultado = "";
    const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"; // lista de caracteres disponibles

    for (let i = 0 ; i < 8 ; i++) {
      const index = Math.floor(Math.random() * caracteres.length);  // obtenemos el indice de un caracter aleatoriamente
      resultado += caracteres[index];  // añadimos el caracter correspondiente al indice al resultado
    }

    return resultado;  // se devuelve el codigo ya formado
  }

  // método POST para que el servidor mande el resguardo de su solicitud en Soporte Técnico al email del usuario
  public mandarEmailSoporte(email:EmailSoporte): Observable<any> {
    return this.http.post<EmailSoporte>(this.config.hostServer + "/email/soporte", email);
  }

  // método POST para que el servidor mande el codigo de verificación al email del usuario para se pueda registrar
  public mandarEmailVerificacion(datos:any): Observable<any> {
    return this.http.post<any>(this.config.hostServer + "/email/verificacion", datos);
  }

  // método POST para que el servidor mande el codigo de verificación al email del usuario para se puedan guardar sus datos modificados
  public mandarEmailVerificacionUpdate(datos:any): Observable<any> {
    return this.http.post<any>(this.config.hostServer + "/email/verificacion-update", datos);
  }
}
