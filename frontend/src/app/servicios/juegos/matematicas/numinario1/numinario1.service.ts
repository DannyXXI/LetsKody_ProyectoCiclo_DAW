import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../configuracion/config.service';
import { PuntuacionNuminario1 } from '../../../../modelos/puntuacion-juegos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Numinario1Service {

  // método constructor del servicio (añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {}

  // metodo para guardar la puntuación o modificarla si se ha obtenido mejor en el servidor
  public enviarPuntuacionNuminario1(datosPuntuacion: PuntuacionNuminario1): Observable<any>{
    return this.http.post<PuntuacionNuminario1>(this.config.hostServer + "/matematicas/numinario1/puntuacion", datosPuntuacion);
  }
}
