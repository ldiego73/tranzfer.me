import { NgModule } from '@angular/core';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingPageComponent } from './loading.page';
import { Logger } from 'src/app/core/logger';

const log = new Logger('Loading');

@NgModule({
  imports: [LoadingRoutingModule],
  declarations: [LoadingPageComponent],
})
export class LoadingModule {
  constructor() {
    log.info('Started Loading!!!');
  }
}
