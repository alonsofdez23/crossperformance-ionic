import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Clase } from 'src/app/models/clase';
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

  claseForm!: FormGroup;

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
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.usersAdminCoachRequest();
    this.indexEntrenoRequest();
    // Setear minutos y segundos a 0 en la fecha actual
    this.date = moment(this.date).minute(0).second(0).format();

    // Formulario clase
    this.claseForm = this.formBuilder.group({
      vacantes: [10, [Validators.required, Validators.min(1), Validators.max(50)]],
      monitor_id: ['', [Validators.required]],
      entreno_id: [''],
    });
  }

  get dataPlazas(): number {
    const plazasControl = this.claseForm.get('plazas');
    if (plazasControl) {
      const plazas = plazasControl.value as number;
      // Ahora puedes usar 'plazas' como un número
      return plazas;
    } else {
      // Maneja el caso en que 'plazas' sea null
      return 0;
    }
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
    if (this.claseForm.invalid) return;

    const clase = this.claseForm.value;
    clase.fecha_hora = this.formatDate(this.date);

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
