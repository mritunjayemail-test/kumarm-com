import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditService } from 'src/app/api/edit.service';
import { UserService } from 'src/app/api/user.service';
import { EditUpdate } from 'src/app/directive/edit.directive';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  data: any;
  subscription!: Subscription;
  constructor(private confData: UserService, private route: ActivatedRoute,
    private editService: EditService) { }
  ngOnInit(): void {

  }

  ionViewWillEnter() {
    // this.confData.load().subscribe((data: any) => {
    //   this.data = data;
    // });
  }
  ionViewDidLeave() {
    // this.subscription.unsubscribe();
  }

  modify(editOrNot: boolean){

    const edit: EditUpdate = {
      id: 'EDIT',
      value: editOrNot
    }

    console.log('SP Call After Change: ', edit);
    this.edit(edit);

  }

  edit(e: EditUpdate) {
    this.editService.edittext(e).then((data) => {
      console.log(data);
    });
  }


}


