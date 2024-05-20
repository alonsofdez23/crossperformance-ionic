import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // isToastOpen = false;

  // setOpen(isOpen: boolean) {
  //   this.isToastOpen = isOpen;
  // }

  public loading: boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl('',
      { validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl('',
      { validators: [Validators.required, Validators.minLength(6)] }
    ),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private utilitiesService: UtilitiesService,
  ) { }

  get dataLogin(): User {
    const login = this.loginForm.value as User;

    return login;
  }

  ngOnInit() {
  }

  public submitForm() {
    // console.log("Estoy en la función submitForm");
    // console.log(this.loginForm.valid);
    // console.log(this.loginForm.value);

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
