<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use Illuminate\Mail\Mailables\Address;  // se importa esta clase para representar direcciones email

class EnviarCorreoCredenciales extends Mailable
{
    use Queueable, SerializesModels;

    public $name;     // variable que tendra el nombre completo del usuario
    public $user;     // variable que tendra su nombre de usuario
    public $pass;     // variable que tendra la contraseña de usuario

    /**
     * Create a new message instance.
     */
    public function __construct($name,$user,$pass)
    {
        // incializamos los valores en el constructor
        $this->name = $name;
        $this->user = $user; 
        $this->pass = $pass; 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address("letskody86@gmail.com", "Let's Kody"),
            subject: "Credenciales de " . $this->name,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.credenciales',  // vista donde se genera el contenido del correo
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
