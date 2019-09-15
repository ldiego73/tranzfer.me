import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { RegisterService } from './actividad.service';

import { Logger } from 'src/app/core/logger';
import { ActivatedRoute, Router } from '@angular/router';

const log = new Logger('Actividad Page');

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPageComponent {

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
}
