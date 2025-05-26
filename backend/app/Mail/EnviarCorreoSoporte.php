<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Illuminate\Mail\Mailables\Address;  // se importa la clase para representar direcciones email

class EnviarCorreoSoporte extends Mailable
{
    use Queueable, SerializesModels;

    public $contenido;     // variable que tendra el contenido de la solicitud
    public $numSolicitud;  // variable para el numero de solicitud

    /**
     * Create a new message instance.
     */
    public function __construct($contenido, $numSolicitud)
    {
        // incializamos el valor en el constructor
        $this->contenido = $contenido;  
        $this->numSolicitud = $numSolicitud; 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address("letskody86@gmail.com", "Let's Kody"),
            subject: 'Resguardo de solicitud #' . $this->numSolicitud,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.resguardo-soporte',  // vista donde se genera el contenido del correo
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
