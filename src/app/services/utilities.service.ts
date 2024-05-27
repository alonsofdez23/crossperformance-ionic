import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  // Toast
  async presentToast(text: string, iconName?: string) {
		const toast = await this.toastCtrl.create({
			message: text,
			duration: 3000,
      swipeGesture: 'vertical',
		});

    if (iconName) {
      toast.icon = iconName;
    }

		toast.present();
	}
}
