import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

import { TransfiereRoutingModule } from './transfiere-routing.module';
import { TransferirPageComponent } from './transfiere.page';
import { TransfiereServie } from './transfiere.service';

import { Logger } from 'src/app/core/logger';

const log = new Logger('Transfiere');

@NgModule({
  imports: [
    TransfiereRoutingModule,
    CommonModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    DialogModule,
    BlockUIModule,
    TableModule,
    RadioButtonModule
  ],
  declarations: [TransferirPageComponent],
  providers: [TransfiereServie]
})
export class TransfiereModule {
  constructor() {
    log.info('Started Tranfiere!!!');
  }
}
