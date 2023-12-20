import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpRequest, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["example.com"],
              disallowedRoutes: ["http://example.com/examplebadroute/"],
          },
      }),
  ),
  provideHttpClient(
      withInterceptorsFromDi()
  ),
  ],
 
};





function tokenGetter(request?: HttpRequest<any> | undefined): string | Promise<string | null> | null {
  throw new Error('Function not implemented.');
}

