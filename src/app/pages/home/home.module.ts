import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home.page';
import { Logger } from 'src/app/core/logger';
import { SharedModule } from 'src/app/shared/shared.module';

const log = new Logger('Home');

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    DialogModule,
  ],
  declarations: [HomePageComponent],
})
export class HomeModule {
  constructor() {
    log.info('Started Home!!!');
  }
}
