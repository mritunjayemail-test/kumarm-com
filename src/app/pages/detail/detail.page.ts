import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})
export class DetailPage {
  routeId: string | null = '';
  session: any;


  defaultHref = '';
  data: any;
  isFavorite = false;
  subscription!: Subscription;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.routeId = id;

    this.subscription = this.confData.load().subscribe((data: any) => {
      this.data = data;
     // this.data = data['HOME']['images'];

      for (const item of data['HOME']['images']) {
        if (item && item.id === id) {
        this.session= item;

          break;
        }

      }


    });
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.defaultHref = `home`;
  }


}
