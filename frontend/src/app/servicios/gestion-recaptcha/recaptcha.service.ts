import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  public siteKey: string;               // clave pública de Google reCAPTCHA v2
  private readonly URL_SERVER: string;  // host del servidor de Laravel

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv";
    this.URL_SERVER = "http://127.0.0.1:8000";
  }

  // metodo POST para mandar el token del reCAPTCHA v2 y validarlo
  public mandarTokenRecaptcha(token:any): Observable<any> {
    return this.http.post<any>(this.URL_SERVER + "/recaptcha", token);
  }
}
