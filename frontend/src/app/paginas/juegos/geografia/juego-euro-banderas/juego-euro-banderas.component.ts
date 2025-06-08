import { Component, OnDestroy, OnInit } from '@angular/core';
import { EurobanderasService } from '../../../../servicios/juegos/geografia/eurobanderas/eurobanderas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PuntuacionEuroBanderas } from '../../../../modelos/puntuacion-juegos';

@Component({
  selector: 'app-juego-euro-banderas',
  imports: [RouterLink],
  templateUrl: './juego-euro-banderas.component.html',
  styleUrl: './juego-euro-banderas.component.css'
})
export class JuegoEuroBanderasComponent implements OnInit, OnDestroy {

  public idParam: string;     // variable del parametro id de la ruta parametrizada de la pagina
  public urlBandera:string;   // variable que almacenará el valor de la url de la bandera
  public op1: string;         // variable que almacenará el valor de la opcion1
  public op2: string;         // variable que almacenará el valor de la opcion2
  public op3: string;         // variable que almacenará el valor de la opcion3
  public op4: string;         // variable que almacenará el valor de la opcion4
  public aciertos:number;     // variable que almacenara el numero de aciertos
  public fallos: number;      // variable que almacenara el numero de fallos
  public saltadas: number;    // variable que almacenara el numero de preguntas saltadas
  public puntos: number;      // variable que almacenara los puntos del usuario
  public tiempo:number;       // variable que almacenara el tiempo en segundos (entero) que tardo el usuario
  public tiempoFinal:number;  // variable que almacenara el tiempofinal en segundos (entero) del usuario (ya que se incrementa el tiempo si hay fallos)
  public datosPuntuacion: PuntuacionEuroBanderas;   // variable con la informacion de la puntuacion para ser enviada al servidor

  private preguntasDisponibles: any[];  // variable que contendra todas las preguntas del juego
  private preguntaActual: any;          // variable que contendra la informacion de la pregunta actual
  private ronda: number;                // variable que contiene ronda actual del juego
  private maxRondas: number;            // variable que contiene el numero de rondas máximas en el juego
  private cronometro: any;              // variable con la que se puede activar y apagar el cronometro

  // método constructor del componente (se inicializa variables, añadimos servicios y enrutadores)
  constructor(public servicioEuroBanderas:EurobanderasService,public router:Router, public activeRoute:ActivatedRoute) {
    this.idParam = (activeRoute.snapshot.params["id"] == undefined) ? "" : activeRoute.snapshot.params["id"];
    this.urlBandera = "";
    this.op1 = "";
    this.op2 = "";
    this.op3 = "";
    this.op4 = "";
    this.aciertos = 0;
    this.fallos = 0;
    this.saltadas = 0;
    this.puntos = 0;
    this.tiempo = 0;
    this.tiempoFinal = 0;
    this.datosPuntuacion = {usuario_id:0, aciertos:0, fallos:0, preguntas_saltadas:0, puntos:0, tiempo:0};
    this.preguntasDisponibles = [];
    this.ronda = 0;
    this.maxRondas = 12;
  }

  // se inicializa el juego al entrar al componente
  ngOnInit(): void {
    this.preguntasDisponibles = [...this.servicioEuroBanderas.datosBanderas];  // se clona el array original para evitar modificarlo
    this.iniciarCronometro();
    this.cargarNuevaPregunta();
  }

  ngOnDestroy(): void {
    clearInterval(this.cronometro);  // s limpia el cronómetro si se sale del componente
  }

  // metodo para iniciar el cronometro (cuenta los segundos)
  private iniciarCronometro():void {
    this.cronometro = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  // metodo para cargar una pregunta en el juego
  private cargarNuevaPregunta() {

    // si se alcanza la ronda maxima se finaliza el juego
    if (this.ronda >= this.maxRondas) {
      this.finalizarJuego();
      return;
    }
    
    const indice = Math.floor(Math.random() * this.preguntasDisponibles.length);  // generamos el indice de la pregunta aleatoriamente

    // guardamos la pregunta correspondiente a ese ID en la variable y se elimina del array de preguntas totales
    this.preguntaActual = this.preguntasDisponibles.splice(indice, 1)[0]; 

    // se le asignan los valores de la pregunta a las variables del componente (URL y opciones)
    this.urlBandera = this.preguntaActual.url;
    this.op1 = this.preguntaActual.opcion1;
    this.op2 = this.preguntaActual.opcion2;
    this.op3 = this.preguntaActual.opcion3;
    this.op4 = this.preguntaActual.opcion4;

    this.ronda++;  // incrementamos el valor de la variable de la ronda
  }

  // metodo para comprobar si la opcion selecciona corresponde con la respuesta correcta o si se ha de saltar la pregunta
  public mandarValor(valorBandera:string):void {

    // si se ha seleccionado la opcion de saltar pregunta (no se modifican los puntos)
    if (valorBandera === "pasarPregunta") {
      this.saltadas++;

    }
    // si se acierta la pregunta (se incrementan los puntos)
    else if (valorBandera === this.preguntaActual.correct) {
      this.aciertos++;
      this.puntos += 100;
    } 
    // si se falla la pregunta (descienden los puntos)
    else {
      this.fallos++;
      this.puntos -= 50;
    }

    this.cargarNuevaPregunta(); // se cargar la siguiente pregunta
  }

  // metodo para finalizar la partida
  private finalizarJuego() {
    clearInterval(this.cronometro); // se detiene el cronometro

    this.tiempoFinal = this.tiempo + this.fallos * 10;  // tiempo final (cada fallo son 10 segundos más)

    this.mostrarModalFinJuego(); // mostramos el modal con los datos finales
  }

  // metodo para guardar o modificar los datos del record del usuario en el juego
  public guardarActualizarPuntuacion():void {
    this.datosPuntuacion = {usuario_id:Number(this.idParam), aciertos:this.aciertos, fallos:this.fallos, preguntas_saltadas:this.saltadas, puntos:this.puntos, tiempo:this.tiempo};

    this.servicioEuroBanderas.enviarPuntuacionBanderas(this.datosPuntuacion).subscribe({
      next: (data) => {
        this.router.navigate(['/usuario/' + this.idParam + '/geografia/1']);
      },
      error: (e) => {
        console.error("Error al crear o actualizar los datos de puntuacion puntutacion", e);

      }
    });
  }

  // metodo para mostrar el modal de abandonar el juego
  public mostrarModalAbandonar() {
    const dialog = document.getElementById("modalAbandonar") as HTMLDialogElement;  // referencia al modal por su ID
    dialog.showModal();
  }

  // metodo para mostrar el modal de abandonar el juego
  public mostrarModalFinJuego() {
    const dialog = document.getElementById("modalfinJuego") as HTMLDialogElement;  // referencia al modal por su ID
    dialog.showModal();
  }
}
