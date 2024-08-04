import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popmodal',
  templateUrl: './popmodal.component.html',
  styleUrls: ['./popmodal.component.scss'],
})
export class PopmodalComponent implements OnInit {
  data: any;
  subscription!: Subscription;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(public confData: UserService,
    private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
