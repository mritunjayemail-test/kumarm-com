import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatrimonialPageRoutingModule } from './matrimonial-routing.module';

import { MatrimonialPage } from './matrimonial.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { KumarmModule } from 'src/app/components/kumarm.module';
import { EditorDirective } from 'src/app/components/edit-popmodal/editor.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    TranslateModule,
    KumarmModule,
    MatrimonialPageRoutingModule
  ],
  declarations: [MatrimonialPage],
})
export class MatrimonialPageModule {}
