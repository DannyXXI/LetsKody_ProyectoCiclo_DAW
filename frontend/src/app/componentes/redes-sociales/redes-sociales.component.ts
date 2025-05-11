import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-redes-sociales',
  imports: [],
  templateUrl: './redes-sociales.component.html',
  styleUrl: './redes-sociales.component.css'
})
export class RedesSocialesComponent implements OnInit {
  public texto: string = "";  // variable que contiene el texto dinámico del elemento HTML

  ngOnInit(): void {
    this.actualizarTexto(window.innerWidth); // cuando se carge el componente llama a la función según el ancho de pantalla
  }

  @HostListener('window:resize', ['$event']) 
  onResize(event: any): void {
    this.actualizarTexto(event.target.innerWidth); // cada vez que el usuario cambie el tamaño de pantalla, se actualiza la variable
  }

  // función que según el tamaño de la pantalla mostrará un texto u otro
  private actualizarTexto(ancho: number): void {
    if (ancho < 992) {
      this.texto = `<i class="fa-regular fa-hand-point-down fa-flip-horizontal"></i> &nbsp Siguenos en nuestras redes sociales &nbsp <i class="fa-regular fa-hand-point-down"></i>`;
    } else {
      this.texto = `Siguenos en nuestras redes sociales &nbsp&nbsp&nbsp<i class="fa-regular fa-hand-point-right"></i>`;
    }
  }
}
