import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonFab, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  inputValue: string[] = [];
  data: any;
  subscription!: Subscription;
  isFavorite = false;
  selectedcroppedImage: any;


  constructor(public confData: UserService,
    private route: ActivatedRoute, private loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
  items!: Event[];

  addItem(newItem: Event) {
    this.items.push(newItem);
  }

  onImagePicked(imageData: string | File) {
    this.selectedcroppedImage = imageData;
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

  myFunction(id: any) {
    let x = document.getElementById(id) as HTMLElement;
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  likeFunction(x: any) {
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
