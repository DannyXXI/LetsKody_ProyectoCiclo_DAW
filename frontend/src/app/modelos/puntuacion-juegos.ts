// interfaz que se usa para representar los datos de puntuacion del juego EuroBanderas
export interface PuntuacionEuroBanderas {
    usuario_id: number,
    aciertos: number,
    fallos: number,
    preguntas_saltadas: number,
    puntos: number,
    tiempo: number
}

// interfaz que se usa para representar los datos de puntuacion del juego Numinario I
export interface PuntuacionNuminario1 {
    usuario_id: number,
    puntos: number,
    tiempo: number
}