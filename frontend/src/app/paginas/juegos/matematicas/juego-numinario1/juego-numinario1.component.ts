import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Celda, CeldaOculta } from '../../../../modelos/tablas-numinario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Numinario1Service } from '../../../../servicios/juegos/matematicas/numinario1/numinario1.service';
import { PuntuacionNuminario1 } from '../../../../modelos/puntuacion-juegos';

@Component({
  selector: 'app-juego-numinario1',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './juego-numinario1.component.html',
  styleUrl: './juego-numinario1.component.css'
})
export class JuegoNuminario1Component implements OnInit, OnDestroy {

  public idParam: string;                // variable del parametro id de la ruta parametrizada de la pagina
  public puntos:number;                  // variable que almacenara los puntos del usuario
  public tiempo:number;                  // variable que almacenara el tiempo en segundos lo que tardó el usuario
  public sizeCelda:number;               // variable que contiene el tamaño por defecto de las celdas en px
  public espaciadoCelda:number;          // variable que contiene el espaciado por defecto entre las celdas en px
  public filas:number;                   // variable que contiene el numero de filas de la tabla iterativa
  public columnas:number;                // variable que contiene el numero de columnas de la tabla iterativa
  public anchoTotalTabla:number;         // variable que contiene el ancho total de la tabla
  public alturaTotalTabla:number;        // variable que contiene la altura total de la tabla
  public celdas:Celda[][];               // matriz bidimensional que contiene la informacion de cada celda de la tabla
  public celdasOcultas:CeldaOculta[];    // variable que contiene las coordenadas de las celdas ocultas
  public operacion:string;               // variable que contiene el texto que muestra la operacion que debe realizar el usaurio
  public respuestaUsuario:string;        // variable que contiene el valor del input introducido por el usuario
  public mensajeError:string;            // variable que contiene el texto del mensaje de error en los modales
  public datosPuntuacion: PuntuacionNuminario1;   // variable con la informacion de la puntuacion para ser enviada al servidor

  private cronometro: any;               // variable con la que se puede activar y apagar el cronometro

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public serviceNuminario1:Numinario1Service, public router:Router, public activeRoute:ActivatedRoute){
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
    this.puntos = 0;
    this.tiempo = 0;
    this.sizeCelda = 60;
    this.espaciadoCelda = 10;
    this.filas = 4;
    this.columnas = 4;
    this.anchoTotalTabla = (this.sizeCelda * this.columnas) + (this.espaciadoCelda * (this.columnas - 1));
    this.alturaTotalTabla = (this.sizeCelda * this.filas) + (this.espaciadoCelda * (this.filas - 1));
    this.celdas = [];
    this.celdasOcultas = [];
    this.operacion = "";
    this.respuestaUsuario = ""
    this.mensajeError = "";
    this.datosPuntuacion = {usuario_id:0, puntos:0, tiempo:0};
  }

  // se inicializa el juego al entrar al componente
  ngOnInit(): void {
    this.iniciarJuego();
    this.iniciarCronometro();
  }

  ngOnDestroy(): void {
    clearInterval(this.cronometro);  // se limpia el cronómetro si se sale del componente
  }

  // método para iniciar el cronometro (cuenta los segundos)
  private iniciarCronometro():void {
    this.cronometro = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  // método para la inicialización completa del juego
  private iniciarJuego():void {
    this.setCssVariables();
    this.generarCeldas();
    this.generarNuevaOperacion(30, 1);
  }

  // método que asigna los valores de las variables del TypeScript a las variables CSS para usarlas en los estilos
  private setCssVariables():void {
    const root = document.documentElement;
    root.style.setProperty("--ancho-celda", this.sizeCelda + "px");
    root.style.setProperty("--altura-celda", this.sizeCelda + "px");
    root.style.setProperty("--espaciado-celda", this.espaciadoCelda + "px");
    root.style.setProperty("--ancho-total-tabla", this.anchoTotalTabla + "px");
    root.style.setProperty("--altura-total-tabla", this.alturaTotalTabla + "px");
  }

  // método para crear la matriz de celdas de la tabla y las oculte
  private generarCeldas():void {
    for (let y = 0 ; y < this.filas ; y++) {
      const fila = [];
      for (let x = 0; x < this.columnas ; x++) {
        fila.push({x:x, y:y, mostrarFondo:false});
        this.celdasOcultas.push({x:x, y:y});
      }
      this.celdas.push(fila);
    }
    this.mezclarOrdenRevelacionCeldas();
  }

  // método para aleaotorizar el orden de aparicion de las celdas tras ser acertadas (algoritmo Fisher-Yates)
  private mezclarOrdenRevelacionCeldas():void {
    for (let i = this.celdasOcultas.length - 1 ; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.celdasOcultas[i], this.celdasOcultas[j]] = [this.celdasOcultas[j], this.celdasOcultas[i]];
    }
  }

  // método para generar una operación aleatoria de suma o resta entre números de 1 al 30
  private generarNuevaOperacion(max:number, min:number):void {
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const operador = Math.random() > 0.5 ? "+" : "-";

    // se evita los resultado negativos en las restas intercambiando los valores de los números
    if (operador === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    this.operacion = num1 + " " + operador + " " + num2;
  }

  // método para verificar si la respuesta del usuario es correcta
  public comprobarRespuesta():void {
    const respuesta = parseInt(this.respuestaUsuario);
    if (isNaN(respuesta)) {
      this.mostrarModalError("Ingrese un número válido.");
      return;
    }

    const respuestaCorrecta = this.calcularRespuestaCorrecta();
    if (respuesta === respuestaCorrecta) {
      this.mostrarCeldaAleatoria();
      this.respuestaUsuario = "";
      this.generarNuevaOperacion(30, 1);
    }
    else {
      this.mostrarModalError("¡Respuesta incorrecta!\nInténtalo con otro número.")
    }
  }

  // método para cálcular la respuesta correcta de la operación
  private calcularRespuestaCorrecta():number {
    const partesOperacion = this.operacion.split(" ");
    if (partesOperacion[1] === "+") {
      return parseInt(partesOperacion[0]) + parseInt(partesOperacion[2])
    }
    else if (partesOperacion[1] === "-") {
      return parseInt(partesOperacion[0]) - parseInt(partesOperacion[2])
    }
    else {
      return -1;
    }
  }

  // método para revelar una de las celda aleatoria de las que permanecen ocultas
  private mostrarCeldaAleatoria():void {
    // se obtiene la última celda del array mezclado de celdas ocultas
    const celdaARevelar = this.celdasOcultas.pop()!;
    this.celdas[celdaARevelar.y][celdaARevelar.x].mostrarFondo = true;
    this.actualizarFondoCelda(this.celdas[celdaARevelar.y][celdaARevelar.x]);

    // si todas las celdas se han revelado, se finaliza el juego
    if (this.celdasOcultas.length === 0) {
      clearInterval(this.cronometro);
      this.puntos = this.calcularPuntuacion(this.tiempo);
      this.mostrarModalFinJuego();
    }
  }

  // método para asignar parte de la imagen que se revela en una celda en la tabla
  private actualizarFondoCelda(celda:any):void {

    // buscamos el elemento <td> correspondiente a las coordenadas x e y
    const elementoCelda = document.querySelector("[data-x='" + celda.x + "'][data-y='" + celda.y + "']");

    if (elementoCelda) {
      // si encuentra la celda, calcula las posiciones horizontales y verticales de la imagen que debe mostrase y las guarda en sus variables CSS
      (elementoCelda as HTMLElement).style.setProperty("--posicion-x", (celda.x * (this.sizeCelda + this.espaciadoCelda))+"px");
      (elementoCelda as HTMLElement).style.setProperty("--posicion-y", (celda.y * (this.sizeCelda + this.espaciadoCelda))+"px");
    }
  }

  // método para cálcular la puntuación del usuario según su tiempo obtenido
  private calcularPuntuacion(tiempo:number):number {
    if (tiempo < 80) {
      return 2000   // menos de 80 segundos -> 2000 puntos
    }
    else if (tiempo >= 80 && tiempo <= 160) {
      return Math.floor(1800 - ((tiempo - 80) * (900 / 80)));  // entre 80 y 160 segundos -> de 1800 a 900 puntos
    }
    else if (tiempo > 160 && tiempo < 200) {
      return 500;   // menos de 200 segundos -> 500 puntos
    }
    else if (tiempo >= 200 && tiempo <= 400) {
      return Math.floor(400 - ((tiempo - 200) * (50 / 200)));  // entre 200 y 400 segundos -> de 400 a 50 puntos
    }
    else {
      return 0;   // más de 400 segundos -> 0 puntos
    }
  }

  // método para mostrar el modal de abandonar el juego
  public mostrarModalAbandonar() {
    const dialog = document.getElementById("modalAbandonar") as HTMLDialogElement;  // referencia al modal por su ID
    dialog.showModal();
  }

  // método para mostrar el modal de fin del juego
  public mostrarModalFinJuego() {
    const dialog = document.getElementById("modalfinJuego") as HTMLDialogElement;  // referencia al modal por su ID
    dialog.showModal();
  }

  // método para mostrar los mensajes en el modal
  public mostrarModalError(mensaje:string) {
    const dialog = document.getElementById("modalError") as HTMLDialogElement;  // referencia al modal por su ID
    this.mensajeError = mensaje;
    dialog.showModal();
  }

  // metodo para guardar o modificar los datos del record del usuario en el juego
  public guardarActualizarPuntuacion():void {
    this.datosPuntuacion = {usuario_id:Number(this.idParam), puntos:this.puntos, tiempo:this.tiempo};

    this.serviceNuminario1.enviarPuntuacionNuminario1(this.datosPuntuacion).subscribe({
      next: (data) => {
        this.router.navigate(['/usuario/' + this.idParam + '/matematicas/1']);
      },
      error: (e) => {
        console.error("Error al crear o actualizar los datos de puntuacion", e);
      }
    });
  }
}
