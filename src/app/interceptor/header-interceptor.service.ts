import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler):

    Observable<HttpEvent<any>> {
    const lang = navigator.language.slice(0,2);
    const modifiedReq = httpRequest.clone({
      headers: httpRequest.headers.set('bucket', `${environment.BUCKET}`).
      set('lang', `${lang}`)
    });
    return next.handle(modifiedReq);
  }
}
