import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  inputValue: string[] = [];
  data: any;
  subscription!: Subscription;
  isFavorite = false;
  selectedcroppedImage: any;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

  onImagePicked(imageData: Event) {
    console.log('onImagePicked', imageData);
    this.selectedcroppedImage = imageData;

    // this.httpService.postPhoto(imageData).then((data) => {
    // });
    console.log('onImagePicked', imageData);
  }

  onclick(key: any, value: any) {
    if (value === undefined) return;
    this.confData.data[key] = value;
  }
  trackByFn(index: any, item: any) {
    return index;
  }


  typeOf(value: any) {
    return typeof value;
  }


}
