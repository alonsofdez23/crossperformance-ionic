import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/clases.service';
import { Atleta, ClasesResponse } from 'src/app/interfaces/clases.interfaces';
import { User } from 'src/app/models/user';
import { Clase } from 'src/app/models/clase';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  public clases: any;
  // Fecha actual
  public now: any = new Date();
  public dateSelected: string = new Date().toISOString();

  public idUser!: number;

  public loading: boolean = false;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.showAuthUserRequest();
    this.indexDateClasesRequest();
  }

  huecosLibres(vacantes: number): any[] {
    return Array(vacantes).fill(0).map((x, i) => i);
  }

  formatDate(date: string): string {
    const dateToFormat = new Date(date);
    const dateFormated = dateToFormat.toISOString().slice(0, 19).replace('T', ' ');
    return dateFormated;
  }

  compareDate(fechaClase: any): boolean {
    if (new Date(fechaClase) < new Date()) {
      return true;
    }
    return false;
  }

  isAtletaJoin(atletas: Atleta[], idUser: number): boolean {
    for (let i = 0; i < atletas.length; i++) {
      if (atletas[i].id === idUser) {
        return true;
      }
    };
    return false;
  }

  loginRequest() {
    const user: User = {
      email: 'alonsobs23@gmail.com',
      password: 'alonsoalonso'
    }

    this.apiService.login(user)
      .subscribe(
        (response) => {
          console.log(response);

          this.apiService.setTokenToHeaders(response.token);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  logoutRequest() {
    console.log(this.apiService.httpOptions);

    this.apiService.logout().subscribe(
      (res) => {
        console.log(res);

        this.apiService.removeTokenToHeader();
        console.log(this.apiService.httpOptions);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.idUser = res.id;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  indexDateClasesRequest() {
    this.loading = true;
    this.apiService.indexDateClase(this.dateSelected)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.clases = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  joinClaseRequest(idClase: number) {
    this.loading = true;
    this.apiService.joinClase(idClase)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  leaveClaseRequest(idClase: number) {
    this.loading = true;
    this.apiService.leaveClase(idClase)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }
}
