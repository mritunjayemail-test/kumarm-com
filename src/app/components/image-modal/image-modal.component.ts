import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from "ngx-image-cropper";

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { ImageUpdate } from './ImageUpdate';
import { ImageService } from 'src/app/api/image.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  selectedImage: any;
  selectedImage_webPath: any;
  imageChangedEvent: any = "";
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  imageTransform: ImageTransform = {};
  showGrid: boolean = false;
  name: string = '';
  data: any;
  subscription!: Subscription;

  roundCropper: boolean = false;
  aspectRatioWH: number= 1/2;
  resizeToWidth: number= 2048;
  resizeToHeight:  number=0;
  id: string=''
  value: string=''

  constructor(private confData: UserService,
    private modalCtrl: ModalController,
    private imageService: ImageService) { }

  // ngOnInit() {
  //   console.log(`${this.selectedImage} ${this.selectedImage_webPath}`)
  //   console.log(`${this.selectedImage}`)
  //   console.log(`${this.selectedImage_webPath}`)

  // }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: LoadedImage) {
  }

  startCropImage() {
    // show message
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  rotateLeft() {
    this.canvasRotation--;
  }

  rotateRight() {
    this.canvasRotation++;
  }

  flipHorizontal() {
    this.imageTransform = {
      ...this.imageTransform,
      flipH: !this.imageTransform.flipH,
    };
  }

  flipVertical() {
    this.imageTransform = {
      ...this.imageTransform,
      flipV: !this.imageTransform.flipV,
    };
  }
  zoomOut() {
    this.scale -= 0.1;
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.imageTransform = {
      ...this.imageTransform,
      scale: this.scale,
    };
  }

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

  confirm() {
     if (this.croppedImage === '') {
      return;
     }
     if (this.id === '') {
      return;
     }
     this.imageService.upload(this.id, this.croppedImage).then((data) => {
      console.log(data);
    });

    return this.modalCtrl.dismiss(this.croppedImage, 'confirm');
  }
}


