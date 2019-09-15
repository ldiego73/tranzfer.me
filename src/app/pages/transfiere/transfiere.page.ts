import { Component, OnInit } from '@angular/core';

import { Logger } from 'src/app/core/logger';
import { TransfiereServie } from './transfiere.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

const log = new Logger('Transfiere Page');

@Component({
  selector: 'app-transfiere',
  templateUrl: './transfiere.page.html',
  styleUrls: ['./transfiere.page.scss'],
})
export class TransferirPageComponent implements OnInit {
  dni: number;

  nombres: string;
  email: string;
  mobile: number;

  isLogged: boolean;

  showModal: boolean = true;
  disabled: boolean = true;
  displayTransaction: boolean = false;
  displayNuevo: boolean = false;
  display: boolean = false;
  message: string;

  blocked: boolean = false;

  accounts: Array<any> = JSON.parse(localStorage.getItem('accounts'));
  account: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private transfiereService: TransfiereServie
  ) {}

  ngOnInit() {
    const transfiere = localStorage.getItem('transfiere');
    const token = this.authService.existsToken();
    this.isLogged = this.authService.isAuthenticated();

    if (!transfiere) {
      this.router.navigate(['']);
    }

    if (token && !this.isLogged) {
      this.authService.refreshToken();
    }
  }

  agregar() {
    const dni = this.isLogged
      ? parseInt(localStorage.getItem('dni'))
      : this.dni;

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

    this.authService.login(dni).subscribe((data: any) => {
      log.info(data);
      this.blocked = false;
    }, (error: any) => {
      const { notExists } = error;

      this.blocked = false;

      if (notExists) {
        this.nuevo();
      }
    });
  }

  agrearCliente() {
    this.displayNuevo = false;

    this.router.navigate(['register', { documento: this.dni }]);
  }

  private nuevo() {
    this.displayNuevo = true;
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

    const transfiere = JSON.parse(localStorage.getItem('transfiere'));

    this.blocked = true;

    this.transfiereService.transfer(transfiere.montoTo).subscribe(data => {
      log.info(data);
      localStorage.removeItem('transfiere');

      this.blocked = false;
      this.displayTransaction = true;
    });
  }

  redirect() {
    this.displayTransaction = false;
    this.router.navigate(['']);
  }

  actividad() {
    this.router.navigate(['actividad']);
  }
}
