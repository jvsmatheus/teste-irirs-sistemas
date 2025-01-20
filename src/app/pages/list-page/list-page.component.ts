import { Component, Injector, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CreateComponent } from '../../components/create/create.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit{

  users: User[];
  filtered_users: User[];

  show_filters: boolean;

  constructor(
    private user_service: UserService,
    private modal: MatDialog,
    private snack_bar: MatSnackBar,
  ) {
    this.users = [];
    this.filtered_users = [];
    this.show_filters = false;
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.users = [];
    this.user_service.getUsers().subscribe({
      next: (data) => {
        for (let user of data) {
          this.users.push(user);
        }
        this.filtered_users = [...this.users];
      },
      error: () => {
        this.snack_bar.open('Erro ao buscar usuários', 'fechar', {duration: 2000});
      }
    })
  }

  save(is_edit: boolean, user?: User) {
    let modal = this.modal.open(
      CreateComponent,
      {
        width: '60vw',
        data: {
          is_edit: is_edit,
          user: user
        }
      }
    );
    
    modal.componentInstance.formSubmittedEvent.subscribe(() => {
      modal.close();
      this.get();
    });
  }

  deleteUser(id: number) {
    this.user_service.deleteUser(id).subscribe(
      {
        next: () => {
          this.snack_bar.open('Usuário deletado com sucesso', 'fechar', {duration: 2000, panelClass: ['custom-snackbar-success']});
          this.get();
        },
        error: (error) => {
          this.snack_bar.open('Erro ao deletar usuário', 'fechar', {duration: 2000, panelClass: ['custom-snackbar-error']});
          this.get();
        },
      }
    )
  }

  search(event: Event, type: 'name' | 'email') {

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (type === 'email') {
      this.filtered_users = this.users.filter(user => {
        return user.email?.toLowerCase().includes(value);
      });
    }
    
    if (type === 'name') {
      this.filtered_users = this.users.filter(user => {
        return user.name?.toLowerCase().includes(value);
      });
    }
  }

  showUserCard(user: User) {
    let modal = this.modal.open(
      UserCardComponent,
      {
        data: {
          user: user
        }
      }
    );
  }
}
