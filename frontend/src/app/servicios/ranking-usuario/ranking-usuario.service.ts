import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuracion/config.service';

@Injectable({
  providedIn: 'root'
})
export class RankingUsuarioService {

  public puntuacionUsuario:any;  // variable con la puntuacion del usuario en todos los juegos

  // método constructor del servicio (se inicializa variables y añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {
    this.puntuacionUsuario = [];
  }

  // método para obtener la puntuación de todos los juegos del usuario del servidor
  public obtenerPuntuacionUsuario(id:string) {
    this.http.get<any>(this.config.hostServer + "/ranking/usuario/" + id).subscribe({
      next: (data) => {
        this.puntuacionUsuario = data;
      },
      error: (e) => {
        console.error("Error al obtener la puntuación del usuario.", e);
        this.puntuacionUsuario = [];
      }
    });
  }
}
