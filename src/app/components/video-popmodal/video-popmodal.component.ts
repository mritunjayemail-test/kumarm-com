import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { Subscription } from 'rxjs';
import { Capacitor } from "@capacitor/core";
import * as _ from 'lodash';
@Component({
  selector: 'app-video-popmodal',
  templateUrl: './video-popmodal.component.html',
  styleUrls: ['./video-popmodal.component.scss'],
})
export class VideoPopmodalComponent implements OnInit {
  @Output() imagePick = new EventEmitter<any>();
  selectedImage: any;
  showGrid: boolean = false;
  data: any;
  subscription!: Subscription;
  message!: string;

  @Input() id!: string;
  @Input() value!: string;
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

  format!: string;
  signedURL!: any;
  url!: any;
  public file!: File;

  onFileChange(fileChangeEvent: any) {







    this.file = fileChangeEvent.target.files[0];
    if (this.file) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (this.file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.openModal();
      }
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: VideoModalComponent,
      componentProps: {
        file: this.file,
        url: this.url,
        format: this.format,
        id: this.id,
        value: this.value
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    //alert(data);
    if (role === 'confirm') {
     _.set(this.data, this.id, data);
     let lastIndex = this.id.lastIndexOf(".");
     let removedId = this.id.substring(0, lastIndex);
     let videoid= `${removedId}.video`

    _.set(this.data, videoid, true);
    }
  }
}
