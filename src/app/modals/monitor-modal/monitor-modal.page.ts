import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-monitor-modal',
  templateUrl: './monitor-modal.page.html',
  styleUrls: ['./monitor-modal.page.scss'],
})
export class MonitorModalPage implements OnInit {

  @Input() nameMonitor!: string;
  @Input() photoMonitor!: string;
  @Input() emailMonitor!: string;

  @Input() roleUser!: string;


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.nameMonitor);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
