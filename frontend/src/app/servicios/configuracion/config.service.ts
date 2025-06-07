import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly host = "http://192.168.1.11:8080";    // variable privada que contiene el host de la URL del servidor de Laravel

  // metodo get para que los servicios accedan a la variable del host sin poder modificarla
  public get hostServer(): string {
    return this.host;
  }

  //"http://127.0.0.1:8000"
}
