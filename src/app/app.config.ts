import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RepositoryToken } from './services/global/repository-token';
import { HttpRepository } from './services/global/http-repository';
import { LocalStorageRepository } from './services/global/local-storage-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: RepositoryToken,
      useClass: environment.useApi ? HttpRepository : LocalStorageRepository,
    },
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
