import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailSoporte } from '../../modelos/email-soporte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public siteKey: string;               // clave pública de Google reCAPTCHA v2
  private readonly URL_SERVER: string;  // host del servidor de Laravel
  public codigoVerificacion: string;    // variable para el codigo de verificacion de registro/modificacion de usuario

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv";
    this.URL_SERVER = "http://127.0.0.1:8000";
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

  // metodo POST para mandar el contenido del email al servidor
  public mandarEmailSoporte(email:EmailSoporte): Observable<any> {
    return this.http.post<EmailSoporte>(this.URL_SERVER + "/email/soporte", email);
  }

  // metodo POST para mandar al servidor que mande un email de verificación
  public mandarEmailVerificacion(datos:any): Observable<any> {
    return this.http.post<any>(this.URL_SERVER + "/email/verificacion", datos);
  }
}
