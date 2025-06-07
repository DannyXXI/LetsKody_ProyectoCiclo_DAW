import { Component } from '@angular/core';
import { RankingUsuarioService } from '../../servicios/ranking-usuario/ranking-usuario.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranking-usuario',
  imports: [CommonModule, RouterLink],
  templateUrl: './ranking-usuario.component.html',
  styleUrl: './ranking-usuario.component.css'
})
export class RankingUsuarioComponent {

  public idParam:string;           // variable del parametro id de la ruta parametrizada de la pagina

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public serviceRanking:RankingUsuarioService, public activeRoute:ActivatedRoute){
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
  }

  // método para convertir los segundos a formato MM:SS
  public formatoTiempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return minutos.toString().padStart(2, '0') + ":" + segundosRestantes.toString().padStart(2, '0');
  }
}
