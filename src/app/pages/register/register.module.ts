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
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register.page';
import { Logger } from 'src/app/core/logger';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { RegisterService } from './register.service';

const log = new Logger('Register');

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule,
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
    RadioButtonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
  ],
  declarations: [RegisterPageComponent],
  providers: [MessageService, RegisterService]
})
export class RegisterModule {
  constructor() {
    log.info('Started Register!!!');
  }
}
