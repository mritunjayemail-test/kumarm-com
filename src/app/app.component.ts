import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Device } from "@capacitor/device";
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './api/user.service';
import { DeviceService } from './api/device.service';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  param = { value: 'world' };
  dark = true;
  logLanguageCode: any;
  data: any;
  isFavorite = false;
  logDeviceInfo: any;

  constructor(translate: TranslateService,
    public confData: UserService,
    private deviceService: DeviceService,
    private route: ActivatedRoute) {
    this.getLanguageCode().then(info => {
      translate.setDefaultLang('en');
      translate.use(info.value);
    });
    this.callData();
    this.deviceInfo();

  }

  async deviceInfo() {
    this.logDeviceInfo = await Device.getInfo();
  }

  callData() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
      this.dark = data['MODE'];
    });
  }

  async getLanguageCode() {
    this.logLanguageCode = await Device.getLanguageCode();
    return this.logLanguageCode;
  }

}
