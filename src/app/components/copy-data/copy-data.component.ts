import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ImageService } from 'src/app/api/image.service';

@Component({
  selector: 'app-copy-data',
  templateUrl: './copy-data.component.html',
  styleUrls: ['./copy-data.component.scss'],
})
export class CopyDataComponent implements OnInit {
  @Input() id!: string;

  constructor(private imageService: ImageService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() { }
  async copy_data() {
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
}
