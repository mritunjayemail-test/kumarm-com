import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent  implements OnInit{
  name: string = '';
  data: any;
  subscription!: Subscription;
  selection: string ='';
  editValue: string ='';


  constructor(private confData: UserService, private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('mmm', `${this.selection}`)
  }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.editValue === ''){
    return;
    }
    return this.modalCtrl.dismiss(this.editValue, 'confirm');
  }
}
