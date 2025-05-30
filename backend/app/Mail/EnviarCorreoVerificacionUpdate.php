<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Illuminate\Mail\Mailables\Address;  // se importa esta clase para representar direcciones email

class EnviarCorreoVerificacionUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public $codigo;     // variable que tendra el codigo de verificacion

    /**
     * Create a new message instance.
     */
    public function __construct($codigo)
    {
        $this->codigo = $codigo;  // incializamos el valor en el constructor
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address("letskody86@gmail.com", "Let's Kody"),
            subject: "Código de verificación",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.verificacion-modificacion',  // vista donde se genera el contenido del correo
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
