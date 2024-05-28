import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PercentagePipe } from './percentage.pipe';
import { FilterPipe } from './filter.pipe';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), PercentagePipe, FilterPipe]
};
