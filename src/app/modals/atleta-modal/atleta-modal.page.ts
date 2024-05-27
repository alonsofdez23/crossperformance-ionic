import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-atleta-modal',
  templateUrl: './atleta-modal.page.html',
  styleUrls: ['./atleta-modal.page.scss'],
})
export class AtletaModalPage implements OnInit {

  @Input() nameAtleta!: string;
  @Input() photoAtleta!: string;
  @Input() emailAtleta!: string;

  @Input() idAtleta!: number;
  @Input() idClase!: number;

  @Input() roleUser!: string;


  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  leaveAtletaClaseRequest(idAtleta: number, idClase: number) {

    this.apiService.leaveAtletaClase(idAtleta, idClase).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeModal('success');
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
