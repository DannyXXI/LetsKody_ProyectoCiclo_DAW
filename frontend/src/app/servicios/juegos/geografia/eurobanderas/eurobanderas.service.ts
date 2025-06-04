import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuntuacionEuroBanderas } from '../../../../modelos/puntuacion-juegos';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../configuracion/config.service';

@Injectable({
  providedIn: 'root'
})
export class EurobanderasService {

  public datosBanderas: Array<string>;  // variable que devuelve todos la informacion de las banderas

  // método constructor del servicio (se inicializa variables y añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {
    this.datosBanderas = [];
  }

  // metodo para obtener todos los datos de las banderas para el EuroBanderas
  public obtenerDatosBanderas(): void {
    this.http.get<any>(this.config.hostServer + "/geografia/eurobanderas").subscribe({
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
    return this.http.post<PuntuacionEuroBanderas>(this.config.hostServer + "/geografia/eurobanderas/puntuacion", datosPuntuacion);
  }
}
