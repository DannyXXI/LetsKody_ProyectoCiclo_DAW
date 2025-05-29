import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../../modelos/usuario-registrado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private readonly URL_SERVER: string;      // host del servidor de Laravel
  public nuevoUsuario:NuevoUsuario;         // objeto que contendra los datos para un registro de usuario
  public nombresUsuariosApp:Array<string>;  // variable con los nombre de usuarios para comprobar al registrar si existe

  // método constructor del servicio (se inicializa variables y añadimos metodo HTTPClient)
  constructor(private http:HttpClient) {
    this.URL_SERVER = "http://127.0.0.1:8000";
    this.nuevoUsuario = {nombreCompleto:"", usuario:"", email:"", password:"", terceros:false};
    this.nombresUsuariosApp = [];
  }

  // metodo POST para registrar un usuario en la base de datos
  public registrarUsuario(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.URL_SERVER + "/usuario/crear", nuevoUsuario);
  }

  // metodo GET privado para todos los nombres de usuario del servidor 
  private getUsersName():Observable<any> {
    return this.http.get<any>(this.URL_SERVER + "/usuario/nombres");
  }

  // metodo para llamar al metodo encargado de obtener los nombres de usuario
  public obtenerNombresUsuario(): void {
    this.getUsersName().subscribe({
      next: (data) => {
        this.nombresUsuariosApp = data;
      },
      error: (e) => {
        console.error("Error al obtener los nombres de usuario", e);
        this.nombresUsuariosApp = [];
      }
    });
  }
}
