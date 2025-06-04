import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../configuracion/config.service';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  public siteKey: string;               // clave pública de Google reCAPTCHA v2

  // método constructor del servicio (se inicializa variables y añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {
    this.siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv";
  }

  // método POST para mandar el token del reCAPTCHA al servidor para validar al usuario
  public mandarTokenRecaptcha(token:any): Observable<any> {
    return this.http.post<any>(this.config.hostServer + "/recaptcha", token);
  }
}
