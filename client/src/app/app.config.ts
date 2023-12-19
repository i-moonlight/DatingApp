import { ApplicationConfig, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { loadingInterceptor } from './_interceptors/loading.interceptor';

const noopInterceptorProvider: Provider =
{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr({positionClass: 'toast-bottom-right'}), 
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    noopInterceptorProvider,
    [provideHttpClient(withInterceptors([JwtInterceptor]))],
    [provideHttpClient(withInterceptors([loadingInterceptor]))],
  ]
};
