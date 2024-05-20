import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public loading: boolean = false;

  public registerForm = new FormGroup({
    name: new FormControl('',
      { validators: [Validators.required, Validators.maxLength(20)] }
    ),
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
  ) { }

  get dataRegister(): User {
    const register = this.registerForm.value as User;

    return register;
  }

  ngOnInit() {
  }

  public submitForm() {
    // console.log("Estoy en la función submitForm");
    // console.log(this.loginForm.valid);
    // console.log(this.loginForm.value);

    if (this.registerForm.invalid) return;

    this.loading = true;
    this.apiService.register(this.dataRegister)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);

          this.apiService.setTokenToHeaders(res.token);
          console.log(this.apiService.httpOptions);

          this.router.navigate(['/menu'])

        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        }
      })
  }

}
