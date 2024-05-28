import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/models/user';
import { Clase } from 'src/app/models/clase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-join-atleta-clase-modal',
  templateUrl: './join-atleta-clase-modal.page.html',
  styleUrls: ['./join-atleta-clase-modal.page.scss'],
})
export class JoinAtletaClaseModalPage implements OnInit {

  @Input() clase!: Clase;

  loading: boolean = false;

  users: User[] = [];
  filteredUsers!: User[];

  inputValueUsers!: string;

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.indexUserRequest();
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  indexUserRequest() {
    this.loading = true;

    this.apiService.indexUser().subscribe({
      next: (res: any) => {
        // Elimina los atletas inscritos en la clase de la lista de usuarios totales
        this.users = res.filter((user: User) =>
          !this.clase.atletas!.some(atletas => user.id === atletas.id)
        );

        // Ordenar lista alfabéticamente por denominación
        this.users.sort((a, b) => a.name!.localeCompare(b.name!));

        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);

        this.loading = false;
      }
    });
  }

  joinAtletaRequest(idAtleta: number) {
    this.apiService.joinAtletaClase(idAtleta, this.clase.id!).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeModal('success');
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterUsers(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredUsers = this.users.filter(entreno =>
      entreno.name!.toLowerCase().includes(searchTerm)
    );
  }
}
