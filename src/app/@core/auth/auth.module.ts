import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


import {NbAuthJWTToken, NbAuthModule, NbAuthService, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule} from '@nebular/theme';
import {environment} from '../../../environments/environment';
import {NgxAuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: environment.REST_API_URL,
          login: {
            endpoint: '/auth/getToken',
            method: 'post',
          },
          register: {
            endpoint: '/auth/register',
            method: 'post'
            // todo redirect to welcome page
          },
          logout: {
            endpoint: '/auth/logout',
            method: 'get',
            redirect: {
              success: '/auth',
              failure: null,
            },
          }
        })],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        register: {
          redirectDelay: 300,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: false,
          socialLinks: false
        },
        logout: {
          redirectDelay: 300,
          strategy: 'email',
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          login: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
    }),
  ],
  declarations: [],
  providers: [
    NbAuthService
  ],
})
export class NgxAuthModule {
}
