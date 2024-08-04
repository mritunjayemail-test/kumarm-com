import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  data: any;
  isFavorite = false;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
}
