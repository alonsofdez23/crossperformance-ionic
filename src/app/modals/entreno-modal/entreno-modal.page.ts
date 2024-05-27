import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clase } from 'src/app/models/clase';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-entreno-modal',
  templateUrl: './entreno-modal.page.html',
  styleUrls: ['./entreno-modal.page.scss'],
})
export class EntrenoModalPage implements OnInit {

  @Input() clase!: Clase;

  @Input() roleUser!: string;


  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    console.log(this.clase.entreno);
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  deleteEntrenoToClaseRequest() {
    this.apiService.deleteEntrenoClase(this.clase.id!)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.closeModal('success');
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

}
