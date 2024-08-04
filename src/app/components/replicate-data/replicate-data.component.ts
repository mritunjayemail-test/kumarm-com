import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ImageService } from 'src/app/api/image.service';

@Component({
  selector: 'app-replicate-data',
  templateUrl: './replicate-data.component.html',
  styleUrls: ['./replicate-data.component.scss'],
})
export class ReplicateDataComponent  implements OnInit {
  @Input() id!: string;

  constructor(private imageService: ImageService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() { }
  async copy_data() {
    // alert('copy' + this.id);
    const loading = await this.loadingCtrl.create({
      message: `Make Duplicate.. Please Refresh your page`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    this.imageService.copy_data(this.id).then((data) => {
      console.log(data);
    });
  }

  async delete_data() {
    // alert('del' + this.id);
    const loading = await this.loadingCtrl.create({
      message: `Deleting.. Please Refresh your page`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    this.imageService.delete_data(this.id).then((data) => {
      console.log(data);
    });
  }

}
