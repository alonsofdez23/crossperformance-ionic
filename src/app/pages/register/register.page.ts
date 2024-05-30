import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  registerForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  get dataRegister(): User {
    const register = this.registerForm.value as User;
    register.role = 'atleta';

    return register;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submitForm() {

    if (this.registerForm.invalid) return;

    this.loading = true;
    this.apiService.register(this.dataRegister)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.apiService.setTokenToHeaders(res.token);
          console.log(this.apiService.httpOptions);

          this.router.navigate(['/menu'])
          this.registerForm.reset();
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        }
      })
  }

}
