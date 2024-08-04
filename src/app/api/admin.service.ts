import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  data: any;
  private FAST_API_DOMAIN = environment.FAST_API_DOMAIN;
  constructor(private http: HttpClient) { }
  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
      .pipe(map(this.processData, this));

    }
  }
  processData(data: any) {
    this.data = data;
    return this.data;
  }
}
