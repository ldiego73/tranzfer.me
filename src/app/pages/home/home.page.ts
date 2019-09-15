import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

import { Logger } from 'src/app/core/logger';
import { homedir } from 'os';

const log = new Logger('Home Page');

interface Country {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', './home.page.css'],
})
export class HomePageComponent {
  countries: SelectItem[];
  days: number = 3;
  tipoCambio: number = 3.3;
  comision: number = 1.5 / 100;

  montoFrom: number = 0;
  montoTo: number = 0;
  montoComision: number = 0;
  countryFrom: Country;
  countryTo: Country;

  showModal: boolean = true;
  disabled: boolean = true;
  display: boolean = false;
  message: string;

  constructor(private route: Router) {
    this.countries = [
      { label: 'Select Country', value: null },
      { label: 'USA', value: { id: 1, name: 'USA', code: 'USA' } },
      { label: 'Perú Soles', value: { id: 2, name: 'Perú Soles', code: 'PE' } },
      {
        label: 'Perú Dolares',
        value: { id: 3, name: 'Perú Dolares', code: 'PE' },
      },
    ];
  }

  montoChanged() {
    let m = this.montoFrom;

    if (!m) {
      m = 0;
    }

    this.calculate();
  }

  countryFromChange(event) {
    log.info('From', event.value);
    this.calculate();
  }

  countryToChange(event) {
    log.info('To', event.value);
    this.calculate();
  }

  private validate(): boolean {
    if (!(this.countryFrom && this.countryTo)) {
      return false;
    }

    return true;
  }

  private calculate() {
    if (!this.validate()) {
      return;
    }

    const comision = 1 - this.comision;

    if (this.countryFrom.id === 1 && this.countryTo.id === 1) {
      this.montoTo = this.montoFrom * comision;
      this.montoComision = this.montoFrom - this.montoTo;
    } else if (this.countryFrom.id === 2 && this.countryTo.id === 2) {
      this.montoTo = this.montoFrom * comision;
      this.montoComision = this.montoFrom - this.montoTo;
    } else if (this.countryFrom.id === 3 && this.countryTo.id === 3) {
      this.montoTo = this.montoFrom * comision;
      this.montoComision = this.montoFrom - this.montoTo;
    } else if (this.countryFrom.id === 1 && this.countryTo.id === 3) {
      this.montoTo = this.montoFrom * comision;
      this.montoComision = this.montoFrom - this.montoTo;
    } else if (this.countryFrom.id === 1 && this.countryTo.id === 2) {
      this.montoTo = this.round(this.montoFrom * this.tipoCambio * comision);
      this.montoComision = this.round(this.montoFrom * this.tipoCambio - this.montoTo);
    } else if (this.countryFrom.id === 2 && this.countryTo.id === 1) {
      this.montoTo = this.round((this.montoFrom / this.tipoCambio) * comision);
      this.montoComision = this.round(this.montoFrom / this.tipoCambio - this.montoTo);
    } else if (this.countryFrom.id === 2 && this.countryTo.id === 3) {
      this.montoTo = this.round((this.montoFrom / this.tipoCambio) * comision);
      this.montoComision = this.round(this.montoFrom / this.tipoCambio - this.montoTo);
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  enviar() {
    if (!this.montoFrom) {
      this.display = true;
      this.message = 'Debe ingresar un monto a enviar';
      return;
    }

    if (!(this.countryFrom && this.countryTo)) {
      this.display = true;
      this.message = 'Debe seleccionar los paises para enviar';
      return;
    }

    localStorage.setItem(
      'transfiere',
      JSON.stringify({
        countryFrom: this.countryFrom,
        countryTo: this.countryTo,
        montoFrom: this.montoFrom,
        montoTo: this.montoTo,
        montoComision: this.montoComision,
      })
    );

    this.route.navigate(['transfiere']);
  }
}
