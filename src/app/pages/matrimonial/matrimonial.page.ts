import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/api/user.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { EditUpdate } from 'src/app/directive/edit.directive';
import { EditService } from 'src/app/api/edit.service';


@Component({
  selector: 'app-matrimonial',
  templateUrl: './matrimonial.page.html',
  styleUrls: ['./matrimonial.page.scss'],
})
export class MatrimonialPage implements OnInit {
  data: any;
  subscription!: Subscription;

  constructor(private confData: UserService, private route: ActivatedRoute,
    private editService: EditService,
    private http: HttpClient) { }
  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }



  format!: string;
  signedURL!: any;
  url!: any;
  public file!: File;

  onFileChange(fileChangeEvent: any) {
    this.file = fileChangeEvent.target.files[0];
    if (this.file) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (this.file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }
  async submitForm() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }),
    };
    let postData = {
      Keyfull: `img/${this.file.name}`,
      type: this.file.type,
      bucket: environment.BUCKET
    };
    this.http.post(environment.FAST_API_DOMAIN + "/video/signedurl",
      postData).pipe(map(this.processSighened, this))
      .subscribe(value => {
        console.log(this.signedURL);
        let formData = new FormData();
        formData.append("key", this.signedURL['fields']['key']);
        formData.append("AWSAccessKeyId", this.signedURL['fields']['AWSAccessKeyId']);
        formData.append("policy", this.signedURL['fields']['policy']);
        formData.append("signature", this.signedURL['fields']['signature']);
        formData.set('x-amz-security-token', this.signedURL['fields']['x-amz-security-token']);
        formData.append("file", this.file);

        this.http.post(this.signedURL['url'], formData).subscribe({});
      });

      const editUpdate: EditUpdate = {
        id: 'HOME.DETAIL_CARD.1.image.url',
        value: `img/${this.file.name}`
      };
      this.edit(editUpdate);
  }


  edit(e: EditUpdate) {
    this.editService.edittext(e).then((data) => {
      console.log(data);
    });
  }

  processData(data: any) {
    console.log(data);
    return data
  }

  processSighened(data: any) {
    this.signedURL = data;
    return data
  }


}
