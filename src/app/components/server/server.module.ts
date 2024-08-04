import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { ServerMainComponent } from './server-main/server-main.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { CockpitComponent } from './cockpit/cockpit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    TranslateModule
  ],
  exports: [
    ServerMainComponent,
    ServerElementComponent,
    CockpitComponent
  ],
  declarations: [
    ServerMainComponent,
    ServerElementComponent,
    CockpitComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServerModule { }
