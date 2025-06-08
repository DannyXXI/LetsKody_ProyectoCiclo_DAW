import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly host = "http://127.0.0.1:8000";    // variable privada que contiene el host de la URL del servidor de Laravel

  private readonly siteKey = "6LfnSkMrAAAAAPYRh-c_2jBN24o-JTDuzFGtQTmv"; // variable privada que contiene la clave pública de Google reCAPTCHA v2

  // metodo get para que los servicios accedan a la variable del host sin poder modificarla
  public get hostServer(): string {
    return this.host;
  }

  // metodo get para que los servicios accedan a la variable de la clave púbica sin poder modificarla
  public get publicKey(): string {
    return this.siteKey;
  }
}