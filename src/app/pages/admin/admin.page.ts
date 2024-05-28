import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AdminUserPage } from '../admin-user/admin-user.page';
import { PhotoService } from 'src/app/services/photo.service';
import { Entreno } from 'src/app/models/entreno';
import { AdminEntrenoPage } from '../admin-entreno/admin-entreno.page';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { AddEntrenoPage } from 'src/app/modals/add-entreno/add-entreno.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public loading: boolean = false;

  selectedSegment: string = 'usuarios';

  public users: User[] = [];
  public entrenos: Entreno[] = [];
  public roleUser!: string;

  public filteredEntrenos!: Entreno[];

  public usersAdmin!: User[];
  public usersCoach!: User[];
  public usersAtleta!: User[];
  public usersNoRole!: User[];

  public filteredUsersAdmin!: User[];
  public filteredUsersCoach!: User[];
  public filteredUsersAtleta!: User[];
  public filteredUsersNoRole!: User[];

  public inputValueUsers!: string;
  public inputValueEntrenos!: string;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    this.indexUser();
    this.indexEntreno();
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event.detail.value);
    // Puedes realizar acciones adicionales aquí si es necesario
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      if (this.selectedSegment === 'usuarios') {
        this.indexUser();
      } else if (this.selectedSegment === 'entrenos') {
        this.indexEntreno();
      }

      event.target.complete();
    }, 1000);
  }

  indexUser() {
    this.loading = true;
    this.apiService.indexUser()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.users = res;

          // Ordenar lista alfabéticamente por denominación
          this.users.sort((a, b) => a.name!.localeCompare(b.name!));

          // Filtrar usuarios por rol
          this.usersAdmin = this.users.filter(user => user.role === 'admin');
          this.usersCoach = this.users.filter(user => user.role === 'coach');
          this.usersAtleta = this.users.filter(user => user.role === 'atleta');
          this.usersNoRole = this.users.filter(user => user.role === null);

          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  indexEntreno() {
    this.loading = true;
    this.apiService.indexEntreno()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.entrenos = res;

          // Ordenar lista alfabéticamente por nombre
          this.entrenos.sort((a, b) => a.denominacion!.localeCompare(b.denominacion!));

          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  deleteEntreno(idEntreno: number) {
    this.loading = true;
    this.apiService.deleteEntreno(idEntreno)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.entrenos = res;
          this.loading = false;
          this.utilitiesService.presentToast(res.message)
          this.indexEntreno();
        },
        error: (err: any) => {
          console.log(err);
          this.utilitiesService.presentToast('Entreno asignado a clase, no se puede borrar', 'alert')
          this.loading = false;
        }
      })
  }

  filterUsers(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredUsersAdmin = this.usersAdmin.filter(user =>
      user.name!.toLowerCase().includes(searchTerm)
    );
    this.filteredUsersCoach = this.usersCoach.filter(user =>
      user.name!.toLowerCase().includes(searchTerm)
    );
    this.filteredUsersAtleta = this.usersAtleta.filter(user =>
      user.name!.toLowerCase().includes(searchTerm)
    );
    this.filteredUsersNoRole = this.usersNoRole.filter(user =>
      user.name!.toLowerCase().includes(searchTerm)
    );
  }

  filterEntrenos(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredEntrenos = this.entrenos.filter(entreno =>
      entreno.denominacion!.toLowerCase().includes(searchTerm)
    );
  }

  // Modals
  async presentModalUser(user: User) {
    // Set void
    this.photoService.photoBase64 = '';

    const modal = await this.modalCtrl.create({
      component: AdminUserPage,
      // breakpoints: [0, 0.8, 1],
      // initialBreakpoint: 0.8,
      componentProps: {
        id: user.id,
        name: user.name,
        photo: user.profile_photo_url,
        email: user.email,
        role: user.role,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(() => {
        this.indexUser();
      });
  }

  async presentModalEntreno(entreno: Entreno) {
    const modal = await this.modalCtrl.create({
      component: AdminEntrenoPage,
      // breakpoints: [0, 0.8, 1],
      // initialBreakpoint: 0.8,
      componentProps: {
        entreno: entreno,

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(() => {
        this.indexEntreno();
      });
  }

  async addEntreno() {
    const modal = await this.modalCtrl.create({
      component: AddEntrenoPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {

        roleUser: this.roleUser,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data === 'success-admin-entrenos') {
      this.indexEntreno();
    }
  }

}
