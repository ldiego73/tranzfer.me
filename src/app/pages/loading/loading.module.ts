import { NgModule } from '@angular/core';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingPageComponent } from './loading.page';
import { Logger } from 'src/app/core/logger';
import { SharedModule } from 'src/app/shared/shared.module';

const log = new Logger('Loading');

@NgModule({
  imports: [LoadingRoutingModule, SharedModule],
  declarations: [LoadingPageComponent],
})
export class LoadingModule {
  constructor() {
    log.info('Started Loading!!!');
  }
}
