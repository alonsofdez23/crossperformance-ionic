import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { UtilitiesService } from '../../services/utilities.service';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public images: LocalFile[] = [];

  public photoBase64!: string;

  public user: any;

  public userToSend!: User;

  public userRequest!: User;

  public loading: boolean = false;

  public profileForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private platform: Platform,
    public photoService: PhotoService,
    private utilitiesService: UtilitiesService
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
    this.showAuthUserRequest();
  }

  public submitForm() {
    // console.log("Estoy en la función submitForm");
    // console.log(this.loginForm.valid);
    // console.log(this.loginForm.value);

    if (this.profileForm.invalid) return;
    this.userToSend = this.profileForm.value;
    console.log(this.userToSend);
    this.userToSend["profile_photo_url"] = this.photoService.photos[0].webviewPath;
    console.log(this.userToSend);

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

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    //console.log(user);
  }

}
