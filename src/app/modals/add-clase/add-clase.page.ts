import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Entreno } from 'src/app/models/entreno';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-add-clase',
  templateUrl: './add-clase.page.html',
  styleUrls: ['./add-clase.page.scss'],
})
export class AddClasePage implements OnInit {

  @Input() date!: string;
  @Input() roleUser!: string;

  public dateTimeZone!: string;

  public monitores: User[] = [];
  public entrenos: Entreno[] = [];

  public monitorSelected: number = 0;
  public entrenoSelected: number | undefined;
  public plazasSelected: number = 10;

  // TimeZone User
  public userTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    this.usersAdminCoachRequest();
    this.indexEntrenoRequest();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  formatDate(date: string): string {
    const dateToFormat = new Date(date);
    const dateFormated = dateToFormat.toISOString().slice(0, 19).replace('T', ' ');
    return dateFormated;
  }

  usersAdminCoachRequest() {
    this.apiService.usersAdminCoach()
      .subscribe({
        next: (res: any) => {
          this.monitores = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  indexEntrenoRequest() {
    this.apiService.indexEntreno()
      .subscribe({
        next: (res: any) => {
          this.entrenos = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  storeClaseRequest() {
    const clase = {
      monitor_id: this.monitorSelected,
      entreno_id: this.entrenoSelected,
      fecha_hora: this.formatDate(this.date),
      vacantes: this.plazasSelected,
    }

    console.log(clase);

    this.apiService.storeClase(clase)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.closeModal();
          this.utilitiesService.presentToast('Clase creada correctamente');
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }
}
