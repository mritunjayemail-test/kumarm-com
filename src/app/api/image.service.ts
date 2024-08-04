import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  data: any;
  private FAST_API_DOMAIN = environment.FAST_API_DOMAIN;
  constructor(private http: HttpClient, private zone: NgZone,
    private userService: UserService) { }

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get('assets/data/data.json').pipe(map(this.processData, this));
      //return this.http.get(this.FAST_API_DOMAIN + '/test/matrimonial').pipe(map(this.processData, this));
    }
  }
  processData(data: any) {
    this.userService.data = false;
    this.data = data;
    return this.data;
  }

  async delete_data(id: string){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      }),
    };
    let postData = {
      id: id,
      lang: environment.LANGUAGE,
      bucket: environment.BUCKET
    };
    return this.http.post(this.FAST_API_DOMAIN + "/image/delete_data",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>console.log('Observable emitted the next value: ' + this.data))
  }


  async copy_data(id: string){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      }),
    };
    let postData = {
      id: id,
      lang: environment.LANGUAGE,
      bucket: environment.BUCKET
    };
    return this.http.post(this.FAST_API_DOMAIN + "/image/copy_data",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>console.log('Observable emitted the next value: ' + this.data))
  }



  async upload(id: string, inputImageBase64: any){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      }),
    };
    let postData = {
      id: id,
      Keyfull: id,
      lang: environment.LANGUAGE,
      image: inputImageBase64,
      bucket: environment.BUCKET
    };
    return this.http.post(this.FAST_API_DOMAIN + "/image/image_upload",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>console.log('Observable emitted the next value: ' + this.data))
  }

   async postPhoto(inputImageWebPath: any){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"

      }),
    };
    let postData = {
      user_id: 'mmmmm',
      image: inputImageWebPath,

    };
    return this.http.post(this.FAST_API_DOMAIN + "/users/image_post1",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>
      console.log('Observable emitted the next value: ' + this.data['message']));
    }
}
