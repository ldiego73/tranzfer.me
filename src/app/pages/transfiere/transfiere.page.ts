import { Component } from '@angular/core';

import { Logger } from 'src/app/core/logger';
import { TransfiereServie } from './transfiere.service';
import { AuthService } from 'src/app/core/auth/auth.service';

const log = new Logger('Transfiere Page');

@Component({
  selector: 'app-transfiere',
  templateUrl: './transfiere.page.html',
  styleUrls: ['./transfiere.page.scss', './transfiere.page.css'],
})
export class TransferirPageComponent {
  dni: number;

  nombres: string;
  email: string;
  mobile: number;

  isLogged: boolean;

  showModal: boolean = true;
  disabled: boolean = true;
  display: boolean = false;
  message: string;

  blocked: boolean = false;

  accounts: Array<any> = JSON.parse(localStorage.getItem('accounts'));
  account: any;

  constructor(
    private authService: AuthService,
    private transfiereService: TransfiereServie
  ) {
    this.isLogged = this.authService.isAuthenticated();
  }

  agregar() {
    const dni = this.isLogged ? parseInt(localStorage.getItem('dni')) : this.dni;

    if (!dni) {
      this.display = true;
      this.message = 'Debe ingresar el DNI';
      return;
    }

    if (dni.toString().length < 8) {
      this.display = true;
      this.message = 'El DNI debe tener 8 digitos';
      return;
    }

    this.blocked = true;

    this.authService.login(dni).subscribe(data => {
      log.info(data);
    });
  }

  selectedAccount(account) {
    this.account = account;
  }

  transferir() {
    if (!this.account || Object.keys(this.account).length < 1) {
      this.display = true;
      this.message = 'Debe seleccionar una cuenta';
      return;
    }

    if (!this.nombres) {
      this.display = true;
      this.message = 'Debe ingresar el Nombre';
      return;
    }

    if (!this.email) {
      this.display = true;
      this.message = 'Debe ingresar el Email';
      return;
    }

    if (!this.mobile) {
      this.display = true;
      this.message = 'Debe ingresar el Movíl';
      return;
    }
  }
}
