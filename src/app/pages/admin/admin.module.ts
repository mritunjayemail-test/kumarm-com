import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
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
    AdminPageRoutingModule
  ],
  declarations: [AdminPage],
})
export class AdminPageModule {}
