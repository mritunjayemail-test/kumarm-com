import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogPageRoutingModule } from './blog-routing.module';

import { BlogPage } from './blog.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PopmodalComponent } from 'src/app/components/popmodal/popmodal.component';
import { EditDirective } from 'src/app/directive/edit.directive';
import { EditorDirective } from 'src/app/components/edit-popmodal/editor.directive';
import { KumarmModule } from 'src/app/components/kumarm.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KumarmModule,
    ImageCropperModule,
    TranslateModule,
    BlogPageRoutingModule
  ],
  declarations: [BlogPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BlogPageModule {}
