import { Component, OnInit } from '@angular/core';
import { ActividadService } from './actividad.service';

import { Logger } from 'src/app/core/logger';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

moment.locale('en');

const log = new Logger('Actividad Page');

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPageComponent implements OnInit{
  actividades: any = [];

  constructor(
    private actividadService: ActividadService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.actividadService.list().subscribe(data => {
      log.info(data);
      this.actividades = data;
    });
  }

  format(created: number) {
    return moment(created).format('DD MMMM YYYY');
  }

  transferir() {
    this.route.navigate(['']);
  }
}
