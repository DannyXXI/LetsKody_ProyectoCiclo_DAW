//interfaz con los datos de modificación del usuario para mandar al servidor
export interface UpdateUsuario {
    id: number,
    nombreCompleto: string,
    nombreUsuario: string,
    email: string,
    lastPass: string,
    newPass: string,
    terceros: boolean
}