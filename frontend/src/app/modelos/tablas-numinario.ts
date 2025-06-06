// interfaz para el contenido de cada celda en el Numinario I
export interface Celda {
    x: number;
    y: number;
    mostrarFondo: boolean;
}



// interfaz para las coordenadas de las celdas ocultas
export interface CeldaOculta {
    x: number;
    y: number;
}