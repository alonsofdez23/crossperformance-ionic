import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/clases.service';
import { ClasesResponse } from 'src/app/interfaces/clases.interfaces';
import { User } from 'src/app/models/user';
import { Clase } from 'src/app/models/clase';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  public clases: any;

  public dateSelected: string = new Date().toISOString();

  public idClase!: number;

  constructor(
    private apiService: ApiService,
  ) {
    this.indexDateClasesRequest(this.dateSelected);
  }

  ngOnInit() {
  }

  changedDate(event: any) {
    console.log(event.detail.value);
    this.dateSelected = event.detail.value;
    this.indexDateClasesRequest(event.detail.value);

  }

  formatDate(date: string): string {
    const dateToFormat = new Date(date);
    const dateFormated = dateToFormat.toISOString().slice(0, 19).replace('T', ' ');
    return dateFormated;
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

  indexClasesRequest() {
    this.apiService.indexClase()
      .subscribe(
        (response) => {
          this.clases = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  indexDateClasesRequest(date: string) {
    this.apiService.indexDateClase(date)
      .subscribe(
        (response) => {
          this.clases = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  indexUsersRequest() {
    this.apiService.indexUser()
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {

        }
      )
  }

  showClasesRequest() {

    this.apiService.showClase(3)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {

        }
      )
  }

  storeClasesRequest() {

    const clase: Clase = {
      monitor_id: 1,
      entreno_id: null,
      fecha_hora: this.formatDate(this.dateSelected!),
      vacantes: 10
    }

    this.apiService.storeClase(clase)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  updateClasesRequest() {

    const clase: Clase = {
      monitor_id: 1,
      entreno_id: 12,
      fecha_hora: this.formatDate(this.dateSelected!),
      vacantes: 15
    }

    this.apiService.updateClase(clase, 7)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  deleteClasesRequest() {

    this.apiService.deleteClase(this.idClase)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error.error.message);
        }
      )
  }
}
