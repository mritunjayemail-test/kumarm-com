import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import * as _ from 'lodash';


@Component({
  selector: 'app-image-popmodal',
  templateUrl: './image-popmodal.component.html',
  styleUrls: ['./image-popmodal.component.scss'],
})
export class ImagePopmodalComponent implements OnInit {
  @Output() imagePick = new EventEmitter<any>();
  selectedImage: any;
  showGrid: boolean = false;

  data: any;

  subscription!: Subscription;
  message!: string;

  @Input() id!: string;
  @Input() value!: string;
  @Input() roundCropper: boolean = false;
  @Input() aspectRatioWH: number = 1 / 2;
  @Input() resizeToWidth: number = 2048;
  @Input() resizeToHeight: number = 0;
  @Input() icontext: boolean = true;

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
  checkPlatformForWeb() {
    if (Capacitor.getPlatform() == "web") return true;
    return false;
  }

  async onPickImage() {
    let web = this.checkPlatformForWeb();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Prompt,
      correctOrientation: true,
      promptLabelPhoto: "Take my picture from Gallary",
      promptLabelPicture: "Prompt Label Picture",
      resultType: web
        ? CameraResultType.DataUrl
        : CameraResultType.Uri
    });
    this.selectedImage = image;
    if (web) {
      this.selectedImage.webPath = image.dataUrl;
    }
    this.showGrid = true;
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: {
        selectedImage: this.selectedImage,
        selectedImage_webPath: this.selectedImage.webPath,
        id: this.id,
        value: this.value,
        roundCropper: this.roundCropper,
        aspectRatioWH: this.aspectRatioWH,
        resizeToWidth: this.resizeToWidth,
        resizeToHeight: this.resizeToHeight
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      _.set(this.data, this.id, data);

       let lastIndex = this.id.lastIndexOf(".");
       let removedId = this.id.substring(0, lastIndex);
       let videoid= `${removedId}.video`

      _.set(this.data, videoid, null);

    }
  }
}
