import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { VictimsRepositoryToken } from './services/victims/victims-repository.token';
import { environment } from '../environments/environment';
import { LocalStorageVictimsRepository } from './services/victims/local-storage-victims-repository';
import { HttpVictimsRepository } from './services/victims/http-victims-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: VictimsRepositoryToken,
      useClass: environment.useApi ? HttpVictimsRepository : LocalStorageVictimsRepository,
    },
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
