import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
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
  @Input() dateClase!: string;

  @Input() roleUser!: string;

  idAtletaSelected!: number;
  idClaseSelected!: number;


  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
  }

  compareDate(fechaClase: any): boolean {
    if (new Date(fechaClase) < new Date()) {
      return true;
    }
    return false;
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

  async presentActionSheet(idAtleta: number, idClase: number) {
    this.idAtletaSelected = idAtleta;
    this.idClaseSelected = idClase;

    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Eliminar atleta de la clase?',
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
        this.leaveAtletaClaseRequest(this.idAtletaSelected, this.idClaseSelected);
        break;
      case 'cancel':
        // Si se cancela
        break;
    }
  }
}
