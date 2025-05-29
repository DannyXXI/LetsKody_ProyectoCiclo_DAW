// interfaz con los datos de registro de un nuevo usuario para que el servidor los maneje
export interface NuevoUsuario {
    nombreCompleto: string,
    usuario: string,
    email: string,
    password: string,
    terceros: boolean
}