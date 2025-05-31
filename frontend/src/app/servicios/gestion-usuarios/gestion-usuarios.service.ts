import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../../modelos/usuario-registrado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelos/usuario';
import { UpdateUsuario } from '../../modelos/usuario-modificado';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private readonly URL_SERVER: string;      // host del servidor de Laravel
  public nuevoUsuario:NuevoUsuario;         // objeto que contendra los datos para un registro de usuario
  public nombresUsuariosApp:Array<string>;  // variable con los nombre de usuarios para comprobar al registrar si existe
  public idsUsuariosApp:Array<number>;      // variable con los ids de usuarios para comprobar al iniciar sesion
  public usuario:Usuario;                   // varaible que contiene los datos del usuario al iniciar sesion
  public updateUsuario:UpdateUsuario;       // objeto que contendra los datos para la modificacion del usuario

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.URL_SERVER = "http://127.0.0.1:8000";
    this.nuevoUsuario = {nombreCompleto:"", usuario:"", email:"", password:"", terceros:false};
    this.nombresUsuariosApp = [];
    this.idsUsuariosApp = [];
    this.usuario = {id:0, nombreCompleto:"", nombreUsuario:"", email:"", terceros:false, puntosBanderas:0, puntosTabla:0};
    this.updateUsuario = {id:0, nombreCompleto:"", nombreUsuario:"", email:"", lastPass:"", newPass:"", terceros:false};
  }

  // metodo POST para registrar un usuario en la base de datos
  public registrarUsuario(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.URL_SERVER + "/usuario/crear", nuevoUsuario);
  }

  // metodo para obtener todos los nombres de usuario del servidor
  public obtenerNombresUsuario(): void {
    this.http.get<any>(this.URL_SERVER + "/usuario/nombres").subscribe({
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
    this.http.get<any>(this.URL_SERVER + "/usuario/ids").subscribe({
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
    return this.http.post<any>(this.URL_SERVER + "/usuario/login", datos);
  }

  // metodo PATCH para actualizar parcialemente los datos del usuario en la base de datos
  public actualizarUsuario(updateUsuario:UpdateUsuario): Observable<any> {
    return this.http.patch<any>(this.URL_SERVER + "/usuario/modificar", updateUsuario);
  }
}
