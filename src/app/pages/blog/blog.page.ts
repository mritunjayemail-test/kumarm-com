import { LoadingController, IonFab } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';
import { EditUpdate } from 'src/app/directive/edit.directive';

register();

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage {
  data: any;
  isFavorite = false;
  subscription!: Subscription;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  param = { value: 'world' };
  ionViewWillEnter() {
    this.subscription = this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
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



