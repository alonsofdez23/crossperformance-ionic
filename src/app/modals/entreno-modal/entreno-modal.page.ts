import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Clase } from 'src/app/models/clase';
import { ApiService } from 'src/app/services/api.service';

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-entreno-modal',
  templateUrl: './entreno-modal.page.html',
  styleUrls: ['./entreno-modal.page.scss'],
})
export class EntrenoModalPage implements OnInit {

  @Input() clase!: Clase;

  @Input() roleUser!: string;

  trustedHtml: any;


  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController,
    public sanitizer: DomSanitizer,
  ) {
  }

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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Eliminar entreno de la clase?',
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
        this.deleteEntrenoToClaseRequest();
        break;
      case 'cancel':
        // Si se cancela
        break;
    }
  }
}
