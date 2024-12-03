import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  sendMail() {
    const message = `Esqueceu a senha? Só colocar esse codigo e cadastrar uma nova senha 582590`;

    this.mailService.sendMail({
      from: 'Teste <teste@gmail.com>',
      to: 'pedromachado2298@gmail.com',
      subject: `Teste envio de email`,
      text: message,
    });
  }
}