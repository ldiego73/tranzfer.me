import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register.page';
import { Logger } from 'src/app/core/logger';

const log = new Logger('Register');

@NgModule({
  imports: [RegisterRoutingModule],
  declarations: [RegisterPageComponent],
})
export class RegisterModule {
  constructor() {
    log.info('Started Register!!!');
  }
}
