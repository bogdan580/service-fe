import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/do';
import {Error} from 'tslint/lib/error';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: NbAuthService;

  constructor(private router: Router, private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');
    this.authService = this.injector.get(NbAuthService);
    let authReq = req;
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.authService.getToken().subscribe((token) => {
          console.log('Token is ok. Set header...');
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
          });
        });
        console.log(authReq);
      }
    });
    return next.handle(authReq).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.logout('email');
          console.error('Token is expired! Remove token');
          localStorage.removeItem('auth_app_token'); // todo it not necessary
          this.router.navigate(['/auth/login']);
          throw new Error('Token is expired');
        }
      }
      // console.log(err);
    });
  }
}
