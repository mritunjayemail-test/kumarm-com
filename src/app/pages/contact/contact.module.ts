import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactPageRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact.page';
import { KumarmModule } from 'src/app/components/kumarm.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    KumarmModule,
    ContactPageRoutingModule
  ],
  declarations: [ContactPage],
})
export class ContactPageModule {}
