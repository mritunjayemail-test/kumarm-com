import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeviceService } from './device.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  private FAST_API_DOMAIN = environment.FAST_API_DOMAIN;
  constructor(private http: HttpClient,
    private deviceService: DeviceService) { }
  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"

        }),
      };
      let timestamp = Date.now();
      //let lang = navigator.language.slice(0,2);
      let lang = environment.LANGUAGE;
      //return this.http.get(`assets/data/lang/${lang}.json`,httpOptions).pipe(map(this.processData, this));
      //return this.http.get(this.FAST_API_DOMAIN + '/test/matrimonial', httpOptions).pipe(map(this.processData, this));
      return this.http.get(`assets/data/lang/${lang}.json?q=${timestamp}`,httpOptions).pipe(map(this.processData, this));
    }
  }
  processData(data: any) {
    this.data = data;
    this.deviceService.getLanguageCode().then(info => {
      this.data['LANGUAGE'] = info;
    });
    this.deviceService.getlogDeviceInfo().then(info => {
      this.data['DEVICE'] = info;
    });
    return this.data;
  }
}
