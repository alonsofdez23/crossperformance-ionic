import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from '../../services/utilities.service';

import { BiometryType, Credentials, NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  server: string = 'alonso.fernandez.com';
  credentials!: Credentials;

  public loading: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,
  ) { }

  get dataLogin(): User {
    const login = this.loginForm.value as User;

    return login;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.getCredentials();

    console.log('CREDENCIALES', this.credentials);

    if (this.credentials) {
      this.performBiometricVerification();
    }
  }

  public submitForm() {

    // console.log(this.loginForm.value);
    // console.log(this.dataLogin);
    // console.log(this.loginForm.invalid);

    if (this.loginForm.invalid) return;

    // Guardamos las credenciales
    this.saveCredentials(this.loginForm.value);
    // Cargamos las credenciales en this.credentials
    this.getCredentials();
    // Hacemos login con los inputs del formulario
    this.loginRequest(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
  }

  loginRequest(email: string, password: string) {
    const dataLogin = {
      email: email,
      password: password,
    }

    this.loading = true;
    this.apiService.login(dataLogin).subscribe({
      next: (res: any) => {
        console.log(res);

        this.apiService.setTokenToHeaders(res.token);
        console.log(this.apiService.httpOptions);

        this.utilitiesService.presentToast(`Bienvenid@ ${res.user.name}`)

        this.router.navigate(['/menu'])
        this.loginForm.reset();
        this.loading = false;
      },
      error: (err: any) => {
        this.utilitiesService.presentToast(err.error.message);
        console.log(err);
        this.loading = false;
      }
    });
  }

  async performBiometricVerification() {
    try {
      const result = await NativeBiometric.isAvailable({ useFallback: true });
      if (!result.isAvailable) return;

      const isFaceID = result.biometryType == BiometryType.FACE_ID;
      console.log(isFaceID);

      const verified = await NativeBiometric.verifyIdentity({
        reason: 'Authentication',
        title: 'Login',
        subtitle: 'Face ID',
        description: 'Tu Face ID se necesita para autorización',
        useFallback: true,
        maxAttempts: 2,
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) return;

      // Hacemos login si el Face ID fue verificado
      this.loginRequest(this.credentials.username, this.credentials.password);
    } catch (e) {
      console.log(e);
    }
  }

  async saveCredentials(data: { email: string; password: string }) {
    try {
      this.deleteCredentials();
      // const result = await NativeBiometric.isAvailable();
      // if (!result.isAvailable) return;
      // Save user's credentials
      await NativeBiometric.setCredentials({
        username: data.email,
        password: data.password,
        server: this.server,
      });

      // this.utilitiesService.presentToast('Credenciales guardadas');
    } catch (e) {
      console.log(e);
    }
  }

  async getCredentials() {
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: this.server,
      });

      this.credentials = credentials;

      console.log(credentials);
    } catch (e) {
      console.log(e);
    }
  }

  deleteCredentials() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: this.server,
    }).then(() => {
      // this.utilitiesService.presentToast('Credenciales borradas');
    });
  }
}
