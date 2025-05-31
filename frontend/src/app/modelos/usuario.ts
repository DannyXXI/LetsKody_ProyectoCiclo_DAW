// interfaz para tener los datos del usuario
export interface Usuario {
    id: number,
    nombreCompleto: string,
    nombreUsuario: string,
    email: string,
    terceros: boolean,
    puntosBanderas: number,
    puntosTabla: number
}