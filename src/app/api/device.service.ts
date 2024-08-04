import { Injectable } from '@angular/core';
import { Device, DeviceInfo, GetLanguageCodeResult } from "@capacitor/device";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  logDeviceInfo: any;
  logLanguageCode: any;

  constructor() { }
  async getlogDeviceInfo(): Promise<DeviceInfo> {
    this.logDeviceInfo = await Device.getInfo();
    return this.logDeviceInfo;
  }

  /**
   * Used for language tranlation.
   * @returns
   */
  async getLanguageCode(): Promise<GetLanguageCodeResult>{
    this.logLanguageCode = await Device.getLanguageCode();
    return this.logLanguageCode;
  }

}
