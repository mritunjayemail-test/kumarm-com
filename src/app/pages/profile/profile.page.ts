import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  data: any;
  isFavorite = false;
  subscription!: Subscription;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.subscription = this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }
}
