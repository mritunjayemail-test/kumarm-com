import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserService } from './user.service';
import { EditUpdate } from '../directive/edit.directive';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private FAST_API_DOMAIN = environment.FAST_API_DOMAIN;
  constructor(private http: HttpClient, private zone: NgZone,
    private userService: UserService) { }

  async edittext(edit: EditUpdate){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }),
    };

    let postData = {
       id: edit.id,
       value: edit.value,
       bucket: environment.BUCKET
    };
    return this.http.post(this.FAST_API_DOMAIN + "/edit/edittext",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>console.log('Observable emitted the next value: ' + value))

  }


  async editVideo(edit: EditUpdate){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }),
    };

    let postData = {
       id: edit.id,
       value: edit.value,
       bucket: environment.BUCKET
    };
    return this.http.post(this.FAST_API_DOMAIN + "/edit/editvideo",
    postData, httpOptions).pipe(map(this.processData, this))
    .subscribe(value =>console.log('Observable emitted the next value: ' + value))

  }


  // async editable(edit: Editable){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "*"
  //     }),
  //   };

  //   let postData = {
  //      id: edit.id,
  //      value: edit.value,
  //      bucket: environment.BUCKET
  //   };
  //   return this.http.post(this.FAST_API_DOMAIN + "/edit/edittext",
  //   postData, httpOptions).pipe(map(this.processData, this))
  //   .subscribe(value =>console.log('Observable emitted the next value: ' + value))

  // }


  processData(data: any) {
    this.userService.data = false;
    this.userService.load().subscribe((data: any) => {
      //this.data = data;
    });

    return data;
  }

}
