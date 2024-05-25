import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public roleUser!: string;

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showAuthUserRequest();
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.roleUser = res.role;
          console.log(this.roleUser);
          this.changeDetectorRef.detectChanges();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

}
