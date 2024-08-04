import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderInterceptorService } from './interceptor/header-interceptor.service';
import { KumarmModule } from './components/kumarm.module';
import { UnlessDirective } from './directive/unless.directive';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
