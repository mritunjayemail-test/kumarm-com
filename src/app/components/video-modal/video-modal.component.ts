import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { ImageService } from 'src/app/api/image.service';
import { environment } from 'src/environments/environment.prod';
import { EditUpdate } from 'src/app/directive/edit.directive';
import { EditService } from 'src/app/api/edit.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent {
  imageChangedEvent: any = "";
  croppedImage: any = '';
  showGrid: boolean = false;
  name: string = '';
  data: any;
  subscription!: Subscription;
  signedURL!: any;

  file!: File;
  url: string = ''
  format: string = ''
  id!: string;
  value: string = ''

  constructor(private confData: UserService,
    private modalCtrl: ModalController,
    private imageService: ImageService,
    private editService: EditService,
    private loadingCtrl: LoadingController,
    private http: HttpClient) { }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
    //this.subscription.unsubscribe();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  async submitForm() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      }),
    };
    let postData = {
      Keyfull: `assets/img/${this.file.name}`,
      type: this.file.type,
      bucket: environment.BUCKET
    };
    this.http.post(environment.FAST_API_DOMAIN + "/video/signedurl",
      postData, httpOptions).pipe(map(this.processSighened, this))
      .subscribe(value => {
        console.log(this.signedURL);
        let formData = new FormData();
        formData.append("key", this.signedURL['fields']['key']);
        formData.append("AWSAccessKeyId", this.signedURL['fields']['AWSAccessKeyId']);
        formData.append("policy", this.signedURL['fields']['policy']);
        formData.append("signature", this.signedURL['fields']['signature']);
        //formData.append("Content-Type", this.file.type);

        formData.set('x-amz-security-token', this.signedURL['fields']['x-amz-security-token']);
        formData.append("file", this.file);



        const httpOption = {
          headers: new HttpHeaders({
            // "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          }),
        };
        //this.http.post(this.signedURL['url'], formData, httpOption).subscribe({});

        this.http.post(`https://s3.eu-west-1.amazonaws.com/${environment.BUCKET}`, formData, httpOption).subscribe({});
      });

    const editUpdate: EditUpdate = {
      id: this.id,
      value: `assets/img/${this.file.name}`
    };
    console.log('editUpdate', editUpdate);
    this.edit(editUpdate);

    //return this.modalCtrl.dismiss(this.croppedImage, 'confirm');
    return this.modalCtrl.dismiss(this.url, 'confirm');
  }
  async edit(e: EditUpdate) {
    this.editService.editVideo(e).then((data) => {
      console.log(data);
    });

    // let lastIndex = e.id.lastIndexOf(".");
    // let removedId = e.id.substring(0, lastIndex);
    // let videoid= `${removedId}.video`

    // const editUpdate: EditUpdate = {
    //   id: videoid,
    //   value: true
    // };

    // this.editService.edittext(editUpdate).then((data) => {
    //   console.log(data);
    // });

    const loading = await this.loadingCtrl.create({
      message: `Deleting.. Please Refresh your page`,
      duration: (Math.random() * 1000) + 1100
    });
    await loading.present();
    await loading.onWillDismiss();
  }

  processSighened(data: any) {
    this.signedURL = data;
    return data
  }
}


