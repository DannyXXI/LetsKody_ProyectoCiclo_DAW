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

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv";
    this.URL_SERVER = "http://127.0.0.1:8000";
  }

  // metodo POST para mandar el contenido del email al servidor
  public mandarEmailSoporte(email:EmailSoporte): Observable<any> {
    return this.http.post<EmailSoporte>(this.URL_SERVER + "/email/soporte", email);
  }
}
