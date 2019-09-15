import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { RegisterService } from './register.service';

import { Logger } from 'src/app/core/logger';
import { ActivatedRoute, Router } from '@angular/router';

const log = new Logger('Register Page');

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPageComponent {
  cliente: any = {};
  cuenta: any = {};
  message: Message[] = [];
  blocked: boolean = false;
  displayTransaction: boolean = false;
  showModal: boolean = true;

  constructor(
    private messageService: MessageService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(data => {
      const { documento } = data;

      if (!documento) {
        this.router.navigate(['transfiere']);
        return;
      }

      this.cliente.documento = documento;
    });
  }

  crear() {
    const {
      nombres,
      apellidos,
      email,
      direccion,
      sexo,
      documento,
    } = this.cliente;

    if (!nombres) {
      this.error('El campo nombres es requerido!');
      return;
    }

    if (!apellidos) {
      this.error('El campo apellidos es requerido!');
      return;
    }

    if (!email) {
      this.error('El campo email es requerido!');
      return;
    }

    if (!direccion) {
      this.error('El campo direccion es requerido!');
      return;
    }

    if (!sexo) {
      this.error('El campo sexo es requerido!');
      return;
    }

    if (!documento) {
      this.error('El campo documento es requerido!');
      return;
    }

    this.message = [];

    this.blocked = true;
    this.registerService.register(this.cliente).subscribe(
      data => {
        log.info(data);
        this.blocked = false;
        this.displayTransaction = true;
      },
      () => {
        this.blocked = false;
        this.error('Ocurrio un error al guardar el Cliente');
      }
    );
  }

  redirect() {
    this.displayTransaction = false;
    this.router.navigate(['transfiere']);
  }

  private error(message: string) {
    this.message = [];
    this.message.push({
      severity: 'error',
      detail: message,
    });
  }
}
