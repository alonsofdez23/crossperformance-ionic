import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
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
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.usersAdminCoachRequest();
    this.indexEntrenoRequest();
    // Setear minutos y segundos a 0 en la fecha actual
    this.date = moment(this.date).minute(0).second(0).format();
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
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

          // Ordenar por name
          this.monitores.sort((a, b) => a.name!.localeCompare(b.name!));

          this.changeDetectorRef.detectChanges();
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

          // Ordenar por denominación
          this.entrenos.sort((a, b) => a.denominacion!.localeCompare(b.denominacion!));

          this.changeDetectorRef.detectChanges();
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

          this.closeModal('success');
          this.utilitiesService.presentToast('Clase creada correctamente');
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }
}
