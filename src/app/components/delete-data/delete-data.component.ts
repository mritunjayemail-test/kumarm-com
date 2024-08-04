import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ImageService } from 'src/app/api/image.service';

@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.scss'],
})
export class DeleteDataComponent implements OnInit {

  @Input() id!: string;

  constructor(private imageService: ImageService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() { }
  async delete_data() {
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

