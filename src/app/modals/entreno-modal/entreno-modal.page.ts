import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-entreno-modal',
  templateUrl: './entreno-modal.page.html',
  styleUrls: ['./entreno-modal.page.scss'],
})
export class EntrenoModalPage implements OnInit {

  @Input() denominacionEntreno!: string;
  @Input() entrenoEntreno!: string;

  @Input() roleUser!: string;


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.denominacionEntreno);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
