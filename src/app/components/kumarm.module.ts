import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PopmodalComponent } from 'src/app/components/popmodal/popmodal.component';
import { FooterCarMovingComponent } from './footer-car-moving/footer-car-moving.component';
import { ImagePopmodalComponent } from './image-popmodal/image-popmodal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ServerMainComponent } from './server/server-main/server-main.component';
import { ServerElementComponent } from './server/server-element/server-element.component';
import { CockpitComponent } from './server/cockpit/cockpit.component';
import { EditPopmodalComponent } from './edit-popmodal/edit-popmodal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EditDirective } from '../directive/edit.directive';
import { EditorDirective } from './edit-popmodal/editor.directive';
import { JsonToTableComponent } from './json-to-table/json-to-table.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { CopyDataComponent } from './copy-data/copy-data.component';
import { DeleteDataComponent } from './delete-data/delete-data.component';
import { ReplicateDataComponent } from './replicate-data/replicate-data.component';
import { VideoPopmodalComponent } from './video-popmodal/video-popmodal.component';
import { VideoModalComponent } from './video-modal/video-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    TranslateModule,
  ],
  exports: [
    ModalComponent,
    PopmodalComponent,
    EditModalComponent,
    EditPopmodalComponent,
    FooterCarMovingComponent,
    CopyDataComponent,
    DeleteDataComponent,
    ReplicateDataComponent,
    ImagePopmodalComponent,
    ImageModalComponent,
    VideoPopmodalComponent,
    VideoModalComponent,
    ServerMainComponent,
    ServerElementComponent,
    CockpitComponent,
    EditDirective,
    EditorDirective,
    JsonToTableComponent,
    TruncatePipe
  ],
  declarations: [
    ModalComponent,
    PopmodalComponent,
    EditModalComponent,
    EditPopmodalComponent,
    FooterCarMovingComponent,
    CopyDataComponent,
    DeleteDataComponent,
    ReplicateDataComponent,
    ImagePopmodalComponent,
    ImageModalComponent,

    VideoPopmodalComponent,
    VideoModalComponent,
    ServerMainComponent,
    ServerElementComponent,
    CockpitComponent,
    EditDirective,
    EditorDirective,
    JsonToTableComponent,
    TruncatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KumarmModule { }
