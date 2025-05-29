import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionUsuariosService } from './servicios/gestion-usuarios/gestion-usuarios.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  // método constructor del componente (se añade el servicio)
  constructor(public serviceUsuarios:GestionUsuariosService){}

  ngOnInit(){
    this.serviceUsuarios.obtenerNombresUsuario(); // al iniciar la app que obtenga todos nombres de usuarios
  }
}
