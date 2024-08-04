import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-edit-popmodal',
  templateUrl: './edit-popmodal.component.html',
  styleUrls: ['./edit-popmodal.component.scss'],
})
export class EditPopmodalComponent implements OnInit {
  @Input() editLocation!: string;
  @Input() editValue!: string;

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

  async openModal(selection: string, editValue: string) {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: {
        selection: selection,
        editValue: editValue,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
