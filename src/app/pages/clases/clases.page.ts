import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Atleta, ClasesResponse } from 'src/app/interfaces/clases.interfaces';
import { User } from 'src/app/models/user';
import { Clase } from 'src/app/models/clase';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MonitorModalPage } from 'src/app/modals/monitor-modal/monitor-modal.page';
import { EntrenoModalPage } from 'src/app/modals/entreno-modal/entreno-modal.page';
import { AtletaModalPage } from 'src/app/modals/atleta-modal/atleta-modal.page';
import { AddClasePage } from 'src/app/modals/add-clase/add-clase.page';
import { tz } from "moment-timezone";
import { AddEntrenoPage } from 'src/app/modals/add-entreno/add-entreno.page';
import * as moment from 'moment-timezone';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AddEntrenoToClasePage } from 'src/app/modals/add-entreno-to-clase/add-entreno-to-clase.page';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  public idClaseSelected!: number;
  public clases: any;

  // TimeZone User
  public userTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public dateSelected: string = moment().format();

  public idUser!: number;
  public roleUser!: string;

  public isActionSheetOpen = false;

  public loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private utilitiesService: UtilitiesService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.showAuthUserRequest();
    this.indexDateClasesRequest();
    console.log(this.apiService.httpLogin);
  }

  huecosLibres(vacantes: number): any[] {
    return Array(vacantes).fill(0).map((x, i) => i);
  }

  formatDate(date: string): string {
    const dateToFormat = new Date(date);
    const dateFormated = dateToFormat.toISOString().slice(0, 19).replace('T', ' ');
    return dateFormated;
  }

  compareDate(fechaClase: any): boolean {
    if (new Date(fechaClase) < new Date()) {
      return true;
    }
    return false;
  }

  isAtletaJoin(atletas: Atleta[], idUser: number): boolean {
    for (let i = 0; i < atletas.length; i++) {
      if (atletas[i].id === idUser) {
        return true;
      }
    };
    return false;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.indexDateClasesRequest();

      event.target.complete();
    }, 1000);
  }

  loginRequest() {
    const user: User = {
      email: 'alonsobs23@gmail.com',
      password: 'alonsoalonso'
    }

    this.apiService.login(user)
      .subscribe(
        (response) => {
          console.log(response);

          this.apiService.setTokenToHeaders(response.token);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  logoutRequest() {
    console.log(this.apiService.httpOptions);

    this.apiService.logout().subscribe(
      (res) => {
        console.log(res);

        this.apiService.removeTokenToHeader();
        console.log(this.apiService.httpOptions);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.idUser = res.id;
          this.roleUser = res.role;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  indexDateClasesRequest() {
    this.loading = true;
    this.apiService.indexDateClase(this.dateSelected)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.clases = res;
          console.log(this.clases);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  backDay() {
    this.dateSelected = moment(this.dateSelected).subtract(1, 'days').format();
    this.indexDateClasesRequest();
  }

  nextDay() {
    this.dateSelected = moment(this.dateSelected).add(1, 'days').format();
    this.indexDateClasesRequest();
  }

  joinClaseRequest(idClase: number) {
    this.loading = true;

    this.apiService.joinClase(idClase)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        }
      });

    setTimeout(() => {
      this.indexDateClasesRequest();
      this.loading = false;
    }, 100);
  }

  joinAtletaClaseRequest(idAtleta: number, idClase: number) {
    this.loading = true;

    this.apiService.joinAtletaClase(idAtleta, idClase)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        }
      });

    setTimeout(() => {
      this.indexDateClasesRequest();
      this.loading = false;
    }, 100);
  }

  leaveClaseRequest(idClase: number) {
    this.loading = true;

    this.apiService.leaveClase(idClase)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        }
      })

    setTimeout(() => {
      this.indexDateClasesRequest();
      this.loading = false;
    }, 100);
  }

  deleteClaseMailRequest(idClase: number) {
    this.loading = true;

    this.apiService.deleteClaseMail(idClase)
      .subscribe({
        next: (res: any) => {
          this.utilitiesService.presentToast(res.message);
          setTimeout(() => {
            this.indexDateClasesRequest();
            this.loading = false;
          }, 100);
          console.log(res);
        },
        error: (err: any) => {
          this.utilitiesService.presentToast(err.error.message, 'alert-circle');
          this.loading = false;
          console.log(err);
        }
      })
  }

  // Modals
  async presentModalMonitor(clase: Clase) {
    const modal = await this.modalCtrl.create({
      component: MonitorModalPage,
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      componentProps: {
        nameMonitor: clase.monitor.name,
        photoMonitor: clase.monitor.profile_photo_url,
        emailMonitor: clase.monitor.email,

        roleUser: this.roleUser,
      },
    });

    await modal.present();
  }

  async presentModalEntreno(clase: Clase) {
    const modal = await this.modalCtrl.create({
      component: EntrenoModalPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        clase: clase,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data === 'success') {
      this.indexDateClasesRequest();
    }
  }

  async presentModalAtleta(atleta: User, clase: Clase) {
    const modal = await this.modalCtrl.create({
      component: AtletaModalPage,
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      componentProps: {
        nameAtleta: atleta.name,
        photoAtleta: atleta.profile_photo_url,
        emailAtleta: atleta.email,

        idAtleta: atleta.id,
        idClase: clase.id,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data === 'success') {
      this.indexDateClasesRequest();
    }
  }

  async addClase(date: any) {
    const modal = await this.modalCtrl.create({
      component: AddClasePage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        date: date,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data === 'success') {
      this.indexDateClasesRequest();
    }
  }

  async addEntreno() {
    const modal = await this.modalCtrl.create({
      component: AddEntrenoPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {

        roleUser: this.roleUser,
      },
    });

    await modal.present();
  }

  async addEntrenoToClase(clase: Clase) {
    const modal = await this.modalCtrl.create({
      component: AddEntrenoToClasePage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        clase: clase,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data === 'success') {
      this.indexDateClasesRequest();
    }
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  async presentActionSheet(idClase: number) {
    this.idClaseSelected = idClase;

    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Eliminar clase?',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();
    this.handleAction(data.action);
  }

  handleAction(action: string) {
    switch (action) {
      case 'delete':
        this.deleteClaseMailRequest(this.idClaseSelected);
        break;
      case 'cancel':
        // Si se cancela
        break;
    }
  }
}
