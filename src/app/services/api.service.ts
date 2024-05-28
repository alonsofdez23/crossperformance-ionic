import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClasesResponse } from '../interfaces/clases.interfaces';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Clase, ClaseStore } from '../models/clase';
import { Entreno } from '../models/entreno';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public httpOptions: any;

  public httpLogin: any = {
    headers: new HttpHeaders({
      // Alonso
      'Authorization': 'Bearer 526|yrOJKbFGLp7VdepiPneKA7EhTK3FPwB4cZN61mIFf85400d2',

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
    return this.http.put<any>(environment.apiUrl + `users/${idUser}`, user, this.httpLogin);
  }

  public updateAvatarUser(avatar: any, idUser: number) {
    return this.http.patch<any>(environment.apiUrl + `users/avatar/${idUser}`, avatar, this.httpLogin);
  }

  public logout() {
    return this.http.get<any>(environment.apiUrl + 'auth/logout', this.httpLogin);
  }

  public showAuthUser() {
    return this.http.get<any>(environment.apiUrl + 'auth/user', this.httpLogin);
  }

  public indexUser() {
    return this.http.get<any>(environment.apiUrl + 'users', this.httpLogin);
  }

  public showUser(idUser: number) {
    return this.http.get<any>(environment.apiUrl + `users/${idUser}`, this.httpLogin);
  }

  public usersAdminCoach() {
    return this.http.get<any>(environment.apiUrl + 'users/roles/admincoach', this.httpLogin);
  }

  // Atletas
  public joinClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/join/${idClase}`, '', this.httpLogin);
  }

  public leaveClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/leave/${idClase}`, '', this.httpLogin);
  }

  public joinAtletaClase(idAtleta: number, idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/joinatleta/${idAtleta}/clase/${idClase}`, '', this.httpLogin);
  }

  public leaveAtletaClase(idAtleta: number, idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/leaveatleta/${idAtleta}/clase/${idClase}`, '', this.httpLogin);
  }

  // Roles
  public assignRole(idUser: number, idRole: number) {
    return this.http.post<any>(environment.apiUrl + `user/${idUser}/role/${idRole}`, this.httpLogin);
  }

  public revokeRole(idUser: number) {
    return this.http.post<any>(environment.apiUrl + `user/${idUser}/revokerole`, this.httpLogin);
  }

  // Clases CRUD
  public indexClase() {
    return this.http.get<any>(environment.apiUrl + 'clases', this.httpLogin);
  }

  public indexDateClase(date: string) {
    return this.http.get<any>(environment.apiUrl + `clases/date/${date}`, this.httpLogin);
  }

  public showClase(id: number) {
    return this.http.get<any>(environment.apiUrl + 'clases/' + id, this.httpLogin);
  }

  public storeClase(clase: ClaseStore) {
    return this.http.post<any>(environment.apiUrl + 'clases/', clase, this.httpLogin);
  }

  public updateClase(clase: Clase, id: number) {
    return this.http.put<any>(environment.apiUrl + 'clases/' + id, clase, this.httpLogin);
  }

  public deleteClase(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'clases/' + id, this.httpLogin);
  }

  public deleteClaseMail(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'clasesmail/' + id, this.httpLogin);
  }

  // Entrenos CRUD
  public indexEntreno() {
    return this.http.get<any>(environment.apiUrl + 'entrenos', this.httpLogin);
  }

  public showEntreno(id: number) {
    return this.http.get<any>(environment.apiUrl + 'entrenos/' + id, this.httpLogin);
  }

  public storeEntreno(entreno: Entreno) {
    return this.http.post<any>(environment.apiUrl + 'entrenos/', entreno, this.httpLogin);
  }

  public updateEntreno(entreno: Entreno, id: number) {
    return this.http.put<any>(environment.apiUrl + 'entrenos/' + id, entreno, this.httpLogin);
  }

  public deleteEntreno(id: number) {
    return this.http.delete<any>(environment.apiUrl + 'entrenos/' + id, this.httpLogin);
  }

  // Entrenos en clases
  public addEntrenoClase(idClase: number, idEntreno: number) {
    return this.http.post<any>(environment.apiUrl + `clases/add/${idClase}`, {
      "entreno_id": idEntreno
    }, this.httpLogin);
  }

  public deleteEntrenoClase(idClase: number) {
    return this.http.post<any>(environment.apiUrl + `clases/delete/${idClase}`, '', this.httpLogin);
  }
}
