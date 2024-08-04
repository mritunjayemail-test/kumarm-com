import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  name: string = '';
  data: any;
  subscription!: Subscription;
  constructor(private confData: UserService, private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
   // this.subscription.unsubscribe();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.name === ''){
    return;
    }
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
