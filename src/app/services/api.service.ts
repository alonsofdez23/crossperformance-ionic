import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClasesResponse } from '../interfaces/clases.interfaces';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Clase, ClaseStore } from '../models/clase';
import { Entreno } from '../models/entreno';
import { first } from 'rxjs';

interface PaymentIntentResponse {
  customerId: string;
  customerEphemeralKeySecret: string;
  paymentIntentClientSecret: string;
  // Otras propiedades que esperes en la respuesta
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public httpOptions: any;

  public httpLogin: any = {
    headers: new HttpHeaders({
      // Alonso
      'Authorization': 'Bearer 1249|eWPOBLlbiIp4VhDkc1BkAB5F8OzPuzHssJlSNNSKf29d493a',

      // Selena
      // 'Authorization': 'Bearer 1168|D8O0ttby10vZLuSLjqRmd26BQ0Nj6ETucwMb0Oflb766e908',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  // Bearer token
  setTokenToHeaders(token: string): void {
    // Asignar token a peticiones
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public removeTokenToHeader(): void {
    this.httpOptions = null;
  }

  // Usuarios
  public register(user: User) {
    return this.http.post<any>(environment.apiUrl + 'auth/register', user);
  }

  public login(user: User) {
    return this.http.post<any>(environment.apiUrl + 'auth/login', user);
  }

  public updateUser(user: User, idUser: number) {
    return this.http.put<any>(environment.apiUrl + `users/${idUser}`, user, this.httpOptions);
  }

  public updateUserAdmin(user: User, idUser: number) {
    return this.http.put<any>(environment.apiUrl + `users-admin/${idUser}`, user, this.httpOptions);
  }

  public updateAvatarUser(avatar: any, idUser: number) {
    return this.http.patch<any>(environment.apiUrl + `users/avatar/${idUser}`, avatar, this.httpOptions);
  }

  public logout() {
    return this.http.get<any>(environment.apiUrl + 'auth/logout', this.httpOptions);
  }

  public showAuthUser() {
    return this.http.get<any>(environment.apiUrl + 'auth/user', this.httpOptions);
  }

  public indexUser() {
    return this.http.get<any>(environment.apiUrl + 'users', this.httpOptions);
  }

  public showUser(idUser: number) {
    return this.http.get<any>(environment.apiUrl + `users/${idUser}`, this.httpOptions);
  }

  public usersAdminCoach() {
    return this.http.get<any>(environment.apiUrl + 'users/roles/admincoach', this.httpOptions);
  }

  // Pagos
  public createCustomer() {
    return this.http.post<any>(environment.apiUrl + 'create-customer', {}, this.httpOptions).pipe(first());
  }

  public createPaymentIntent(amount: number, currency: string) {
    const body = { amount, currency };

    return this.http.post<any>(environment.apiUrl + 'create-payment-intent', body, this.httpOptions).pipe(first());
  }

  public pagoUnico(amount: number, currency: string) {
    const body = { amount, currency };

    return this.http.post<PaymentIntentResponse>(environment.apiUrl + 'pago-unico', body, this.httpOptions);
  }

  // Suscripción custom
  public customSubscribe(suscripcion: number) {
    const body = { suscripcion };

    return this.http.post<any>(environment.apiUrl + 'pagos/suscripcion/custom', body, this.httpOptions);
  }

  // Atletas
  public joinClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/join/${idClase}`, '', this.httpOptions);
  }

  public leaveClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/leave/${idClase}`, '', this.httpOptions);
  }

  public joinAtletaClase(idAtleta: number, idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/joinatleta/${idAtleta}/clase/${idClase}`, '', this.httpOptions);
  }

  public leaveAtletaClase(idAtleta: number, idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/leaveatleta/${idAtleta}/clase/${idClase}`, '', this.httpOptions);
  }

  // Roles
  public assignRole(idUser: number, idRole: number) {
    return this.http.post<any>(environment.apiUrl + `user/${idUser}/role/${idRole}`, this.httpOptions);
  }

  public revokeRole(idUser: number) {
    return this.http.post<any>(environment.apiUrl + `user/${idUser}/revokerole`, this.httpOptions);
  }

  // Clases CRUD
  public indexClase() {
    return this.http.get<any>(environment.apiUrl + 'clases', this.httpOptions);
  }

  public indexDateClase(date: string) {
    return this.http.get<any>(environment.apiUrl + `clases/date/${date}`, this.httpOptions);
  }

  public showClase(id: number) {
    return this.http.get<any>(environment.apiUrl + 'clases/' + id, this.httpOptions);
  }

  public storeClase(clase: ClaseStore) {
    return this.http.post<any>(environment.apiUrl + 'clases/', clase, this.httpOptions);
  }

  public updateClase(clase: Clase, id: number) {
    return this.http.put<any>(environment.apiUrl + 'clases/' + id, clase, this.httpOptions);
  }

  public deleteClase(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'clases/' + id, this.httpOptions);
  }

  public deleteClaseMail(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'clasesmail/' + id, this.httpOptions);
  }

  // Entrenos CRUD
  public indexEntreno() {
    return this.http.get<any>(environment.apiUrl + 'entrenos', this.httpOptions);
  }

  public showEntreno(id: number) {
    return this.http.get<any>(environment.apiUrl + 'entrenos/' + id, this.httpOptions);
  }

  public storeEntreno(entreno: Entreno) {
    return this.http.post<any>(environment.apiUrl + 'entrenos/', entreno, this.httpOptions);
  }

  public updateEntreno(entreno: Entreno, id: number) {
    return this.http.put<any>(environment.apiUrl + 'entrenos/' + id, entreno, this.httpOptions);
  }

  public deleteEntreno(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'entrenos/' + id, this.httpOptions);
  }

  // Entrenos en clases
  public addEntrenoClase(idClase: number, idEntreno: number) {
    return this.http.post<any>(environment.apiUrl + `clases/add/${idClase}`, {
      "entreno_id": idEntreno
    }, this.httpOptions);
  }

  public deleteEntrenoClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/delete/${idClase}`, '', this.httpOptions);
  }
}
