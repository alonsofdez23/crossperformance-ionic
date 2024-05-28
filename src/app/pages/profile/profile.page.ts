import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: any;

  public userRequest!: User;

  public loading: boolean = false;

  public profileForm!: FormGroup;

  public isActionSheetOpen = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private platform: Platform,
    public photoService: PhotoService,
    private utilitiesService: UtilitiesService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  get dataRegister(): User {
    const register = this.profileForm.value as User;

    return register;
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    })

    this.loading = true;
    this.apiService.showAuthUser()
    .subscribe({
      next: (res: any) => {
        this.user = res;

        this.profileForm.patchValue({
          name: this.user.name,
          email: this.user.email,
        })

        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })

    this.photoService.loadSaved();
  }

  ionViewWillEnter() {
    // Set void
    this.photoService.photoBase64 = '';
    this.showAuthUserRequest();
  }

  public submitForm() {
    // console.log("Estoy en la función submitForm");
    // console.log(this.loginForm.valid);
    // console.log(this.loginForm.value);

    if (this.profileForm.invalid) return;

    const user = this.profileForm.value
    user.profile_photo_url = this.photoService.photoBase64;

    this.loading = true;
    this.apiService.updateUser(user, this.user.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.showAuthUserRequest();
          this.utilitiesService.presentToast('Usuario actualizado');
          this.loading = false;
        },
        error: (err: any) => {
          // if (err.error.errors.password[0] === 'validation.required') {
          //   this.utilitiesService.presentToast('Debes introducir contraseña');
          // }
          this.utilitiesService.presentToast('Debes rellenar todos los campos');

          this.loading = false;
        }
      })
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.user = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

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
