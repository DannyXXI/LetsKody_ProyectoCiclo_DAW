import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuntuacionEuroBanderas } from '../../../../modelos/puntuacion-juegos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EurobanderasService {

  private readonly URL_SERVER: string;  // host del servidor de Laravel
  public datosBanderas: Array<string>;  // variable que devuelve todos la informacion de las banderas

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.URL_SERVER = "http://127.0.0.1:8000";
    this.datosBanderas = [];
  }

  // metodo para obtener todos los datos de las banderas para el EuroBanderas
  public obtenerDatosBanderas(): void {
    this.http.get<any>(this.URL_SERVER + "/geografia/eurobanderas").subscribe({
      next: (data) => {
        this.datosBanderas = data;
      },
      error: (e) => {
        console.error("Error al obtener los nombres de los usuarios", e);
        this.datosBanderas = [];
      }
    });
  }

  // metodo para guardar laa puntuación o modificarla si se ha obtenido mejor en el servidor
  public enviarPuntuacionBanderas(datosPuntuacion: PuntuacionEuroBanderas): Observable<any>{
    return this.http.post<PuntuacionEuroBanderas>(this.URL_SERVER + "/geografia/eurobanderas/puntuacion", datosPuntuacion);
  }
}
