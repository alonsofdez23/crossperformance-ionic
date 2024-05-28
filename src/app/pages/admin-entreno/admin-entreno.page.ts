import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Entreno } from 'src/app/models/entreno';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-entreno',
  templateUrl: './admin-entreno.page.html',
  styleUrls: ['./admin-entreno.page.scss'],
})
export class AdminEntrenoPage implements OnInit {

  public loading: boolean = false;

  @Input() entreno!: Entreno;

  @Input() roleUser!: string;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.showEntreno(this.entreno.id!)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.entreno = res;

        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'close')
  }

}
