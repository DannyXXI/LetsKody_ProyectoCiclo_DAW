import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionUsuariosService } from './servicios/gestion-usuarios/gestion-usuarios.service';
import { EurobanderasService } from './servicios/juegos/geografia/eurobanderas/eurobanderas.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
