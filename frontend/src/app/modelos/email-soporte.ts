// interfaz para el envio de emails en la seccion de soporte
export interface EmailSoporte {
    destinatario: string,
    contenido: string,
    token: string
}