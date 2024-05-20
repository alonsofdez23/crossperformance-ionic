import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-atleta-modal',
  templateUrl: './atleta-modal.page.html',
  styleUrls: ['./atleta-modal.page.scss'],
})
export class AtletaModalPage implements OnInit {

  @Input() nameAtleta!: string;
  @Input() photoAtleta!: string;
  @Input() emailAtleta!: string;

  @Input() roleUser!: string;


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.nameAtleta);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
