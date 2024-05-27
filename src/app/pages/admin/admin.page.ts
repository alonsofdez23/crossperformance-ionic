import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AdminUserPage } from '../admin-user/admin-user.page';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public loading: boolean = false;

  public users: User[] = [];
  public roleUser!: string;

  public usersAdmin!: User[];
  public usersCoach!: User[];
  public usersAtleta!: User[];
  public usersNoRole!: User[];

  public filteredUsersAdmin!: User[];
  public filteredUsersCoach!: User[];
  public filteredUsersAtleta!: User[];
  public filteredUsersNoRole!: User[];

  public inputValue!: string;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.indexUser();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.indexUser();

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

          // Ordenar lista alfabéticamente por nombre
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

}
