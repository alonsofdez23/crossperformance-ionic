import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clase } from 'src/app/models/clase';
import { Entreno } from 'src/app/models/entreno';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-entreno-to-clase',
  templateUrl: './add-entreno-to-clase.page.html',
  styleUrls: ['./add-entreno-to-clase.page.scss'],
})
export class AddEntrenoToClasePage implements OnInit {

  @Input() clase!: Clase;

  public entrenoSelected!: number;

  public entrenos: Entreno[] = [];
  public entrenoEntreno!: string;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.indexEntrenoRequest();
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  indexEntrenoRequest() {
    this.apiService.indexEntreno()
      .subscribe({
        next: (res: any) => {
          this.entrenos = res;
          console.log(this.entrenos);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  getEntreno(idEntreno: number): string {
    const elemento = this.entrenos.find(item => item.id === idEntreno);
    return elemento ? elemento.entreno : '';
  }

  showEntreno() {
    this.entrenoEntreno = this.getEntreno(this.entrenoSelected);
  }

  // showEntrenoRequest() {
  //   this.apiService.showEntreno(this.entrenoSelected)
  //     .subscribe({
  //       next: (res: any) => {
  //         this.entreno = res;
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //       }
  //     })
  // }

  addEntrenoClaseRequest() {
    this.apiService.addEntrenoClase(this.clase.id!, this.entrenoSelected)
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
