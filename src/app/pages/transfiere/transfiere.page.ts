import { Component } from '@angular/core';

import { Logger } from 'src/app/core/logger';
import { TransfiereServie } from './transfiere.service';
import { AuthService } from 'src/app/core/auth/auth.service';

const log = new Logger('Transfiere Page');

@Component({
  selector: 'app-transfiere',
  templateUrl: './transfiere.page.html',
  styleUrls: ['./transfiere.page.scss'],
})
export class TransferirPageComponent {
  dni: number;

  showModal: boolean = true;
  disabled: boolean = true;
  display: boolean = false;
  message: string;

  blocked: boolean = false;

  constructor(private authService: AuthService, private transfiereService: TransfiereServie) {}

  transferir() {
    if (!this.dni) {
      this.display = true;
      this.message = 'Debe ingresar el DNI';
      return;
    }

    if (this.dni.toString().length < 8) {
      this.display = true;
      this.message = 'El DNI debe tener 8 digitos';
      return;
    }

    this.blocked = true;

    if (!this.authService.isAuthenticated()) {
      this.authService.login(this.dni).subscribe(data => {
        log.info(data);
      });
    } else {
      this.validarDni();
    }
  }

  validarDni() {

  }
}
