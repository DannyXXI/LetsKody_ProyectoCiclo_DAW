import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../../modelos/usuario-registrado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelos/usuario';
import { UpdateUsuario } from '../../modelos/usuario-modificado';
import { ConfigService } from '../configuracion/config.service';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  public nuevoUsuario:NuevoUsuario;         // objeto que contendra los datos para un registro de usuario
  public nombresUsuariosApp:Array<string>;  // variable con los nombre de usuarios para comprobar al registrar si existe
  public idsUsuariosApp:Array<number>;      // variable con los ids de usuarios para comprobar al iniciar sesion
  public usuario:Usuario;                   // varaible que contiene los datos del usuario al iniciar sesion
  public updateUsuario:UpdateUsuario;       // objeto que contendra los datos para la modificacion del usuario

  // método constructor del servicio (se inicializa variables y añadimos método HTTPClient y servicio de configuración)
  constructor(private http:HttpClient, private config:ConfigService) {
    this.nuevoUsuario = {nombreCompleto:"", usuario:"", email:"", password:"", terceros:false};
    this.nombresUsuariosApp = [];
    this.idsUsuariosApp = [];
    this.usuario = {id:0, nombreCompleto:"", nombreUsuario:"", email:"", terceros:false, puntosBanderas:0, puntosTabla:0};
    this.updateUsuario = {id:0, nombreCompleto:"", nombreUsuario:"", email:"", lastPass:"", newPass:"", terceros:false};
  }

  // metodo POST para registrar un usuario en la base de datos
  public registrarUsuario(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.config.hostServer + "/usuario/crear", nuevoUsuario);
  }

  // metodo para obtener todos los nombres de usuario del servidor
  public obtenerNombresUsuario(): void {
    this.http.get<any>(this.config.hostServer + "/usuario/nombres").subscribe({
      next: (data) => {
        this.nombresUsuariosApp = data;
      },
      error: (e) => {
        console.error("Error al obtener los nombres de los usuarios", e);
        this.nombresUsuariosApp = [];
      }
    });
  }

  // metodo para obtener todos los ids de usuario del servidor
  public obtenerIdsUsuario(): void {
    this.http.get<any>(this.config.hostServer + "/usuario/ids").subscribe({
      next: (data) => {
        this.idsUsuariosApp = data;
      },
      error: (e) => {
        console.error("Error al obtener los ids de los usuario", e);
        this.idsUsuariosApp = [];
      }
    });
  }

  // metodo POST para verificar los datos de un usuario al hacer login
  public verificarLogin(datos:any): Observable<any> {
    return this.http.post<any>(this.config.hostServer + "/usuario/login", datos);
  }

  // metodo PATCH para actualizar parcialemente los datos del usuario en la base de datos
  public actualizarUsuario(updateUsuario:UpdateUsuario): Observable<any> {
    return this.http.patch<any>(this.config.hostServer + "/usuario/modificar", updateUsuario);
  }

  // metodo DELETE para eliminar un usuario por id
  public deleteUsuario(id:string): Observable<any> {
    return this.http.delete<any>(this.config.hostServer + "/usuario/eliminar/" + id);
  }
}
