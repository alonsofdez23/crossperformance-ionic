import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-entreno',
  templateUrl: './add-entreno.page.html',
  styleUrls: ['./add-entreno.page.scss'],
})
export class AddEntrenoPage implements OnInit {

  title = 'angular';
  public Editor = ClassicEditor;

  public denominacion: string = '';
  public entreno: string = '';

  constructor(
    private modalCtrl: ModalController,
    private utilitiesService: UtilitiesService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() { }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  storeEntrenoRequest() {
    const entreno = {
      denominacion: this.denominacion,
      entreno: this.entreno,
    }

    console.log(entreno);

    this.apiService.storeEntreno(entreno)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.closeModal('success-admin-entrenos');
          this.utilitiesService.presentToast(`Entreno ${entreno.denominacion} creado correctamente`);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

}
