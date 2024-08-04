import { LoadingController, IonFab, RangeCustomEvent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/api/image.service';

register();

@Component({
  selector: 'app-resume',
  templateUrl: './resume.page.html',
  styleUrls: ['./resume.page.scss'],
})
export class ResumePage implements OnInit {
  identity! : string | undefined;

  ngOnInit(): void {

  }
  data: any;
  isFavorite = false;
  subscription!: Subscription;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private imageService: ImageService,
  ) { }

  addItem(event: string){
    // alert(event);
    this.identity= event;
  }



  ionViewWillEnter() {
    this.subscription = this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  onIonChange(i: any, ev: Event) {
    console.log('ionChange emitted value:', (ev as RangeCustomEvent).detail.value);
    console.log('ionChange emitted value:', i);

  }

  async copy_data() {
    if (this.identity === undefined)
    {
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: `Make Duplicate.. Please Refresh your page`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    this.imageService.copy_data(this.identity).then((data) => {
      console.log(data);
    });
    this.identity = undefined;
  }

  async delete_data() {
    if (this.identity === undefined)
    {
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: `Deleting.. Please Refresh your page`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    this.imageService.delete_data(this.identity).then((data) => {
      console.log(data);
    });
    this.identity = undefined;
  }


  async openSocial(network: string, fab: IonFab) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

}
