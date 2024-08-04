import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  data: any;
  isFavorite = false;
  subscription!: Subscription;
  constructor(public confData: UserService,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.confData.load().subscribe((data: any) => {
      this.data = data;
    });
  }
  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

}
