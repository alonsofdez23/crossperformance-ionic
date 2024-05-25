import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {

  public loading: boolean = false;

  @Input() id!: number;
  @Input() name!: string;
  @Input() photo!: string;
  @Input() email!: string;
  @Input() role!: string;

  @Input() roleUser!: string;

  public user: any;

  public profileForm!: FormGroup;

  public isActionSheetOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    public photoService: PhotoService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      role: [''],
    })

    this.loading = true;
    this.apiService.showUser(this.id)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res[0];

        this.profileForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
        })

        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  public submitForm() {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const user = this.profileForm.value;

    console.log(user);

    this.loading = true;
    this.apiService.updateUser(user, this.user.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.utilitiesService.presentToast('Usuario actualizado');
          this.loading = false;

          return this.modalCtrl.dismiss(this.name, 'confirm');
        },
        error: (err: any) => {
          console.log(err);
          // if (err.error.errors.password[0] === 'validation.required') {
          //   this.utilitiesService.presentToast('Debes introducir contraseña');
          // }
          this.utilitiesService.presentToast('Debes rellenar todos los campos');

          this.loading = false;
        }
      })
  }

  // Subir avatar
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        {
          text: 'Fotos',
          data: {
            action: 'library',
          },
        },
        {
          text: 'Cámara',
          data: {
            action: 'camera',
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
      case 'library':
        this.addPhotoLibrary();
        break;
      case 'camera':
        this.addPhotoCamera();
        break;
      case 'cancel':
        // Si se cancela
        break;
    }
  }

  addPhotoLibrary() {
    this.photoService.addNewToGallery(CameraSource.Photos, true, this.user.id);
  }

  addPhotoCamera() {
    this.photoService.addNewToGallery(CameraSource.Camera, true, this.user.id);
  }

}
