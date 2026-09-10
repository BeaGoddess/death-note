import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { VICTIMS_REPOSITORY } from './services/victims-repository.token';
import { environment } from '../environments/environment';
import { LocalStorageVictimsRepository } from './services/local-storage-victims-repository';
import { HttpVictimsRepository } from './services/http-victims-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: VICTIMS_REPOSITORY,
      useClass: environment.useApi ? HttpVictimsRepository : LocalStorageVictimsRepository,
    },
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
