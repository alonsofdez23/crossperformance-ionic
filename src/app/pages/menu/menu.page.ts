import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public user: User = {
    email: '',
  };

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private utilitesService: UtilitiesService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showAuthUserRequest();
  }

  compareDate(fecha: any): boolean {
    if (new Date(fecha) < new Date()) {
      return true;
    }
    return false;
  }

  handleRouter() {
    // Comprueba el estado de la suscripción
    this.showAuthUserRequest();

    if (!this.user.suscripcion) {
      if (this.user.role === 'admin' || this.user.role === 'coach') {
        this.router.navigate(['/clases']);
      } else {
        this.utilitesService.presentToast('Necesitas activar una suscipción', 'alert');
        this.router.navigate(['/pagos']);
      }
    } else if (this.compareDate(this.user.suscripcion)) {
      this.utilitesService.presentToast('Suscipción caducada', 'alert');
      this.router.navigate(['/pagos']);
    } else {
      this.router.navigate(['/clases']);
    }
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.user = res;
          console.log(this.user);
          this.changeDetectorRef.detectChanges();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

}
