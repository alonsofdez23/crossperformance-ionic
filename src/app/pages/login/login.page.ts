import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
  }

  public submitForm() {

    // console.log(this.loginForm.value);
    // console.log(this.dataLogin);
    // console.log(this.loginForm.invalid);

    if (this.loginForm.invalid) return;

    this.loading = true;
    this.apiService.login(this.dataLogin)
      .subscribe({
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
      })
  }

}
