import { Component, Injector, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../../components/create/create.component';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit{

  users: User[];
  filtered_users: User[];

  constructor(
    private user_service: UserService,
    private modal: MatDialog,
  ) {
    this.users = [];
    this.filtered_users = [];
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.users = [];
    this.user_service.getUsers().subscribe(
      (data) => {
        for (let user of data) {
          this.users.push(user);
        }
        this.filtered_users = [...this.users];
        console.log("Users", this.users);
      }
    )
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
    })
  }

  deleteUser(id: number) {
    console.log(id);
    
    this.user_service.deleteUser(id).subscribe(
      (data) => {
        this.get();
        console.log("User deletado", data);
      }
    )
  }

  search(event: Event, type: 'name' | 'email') {

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (type === 'email') {
      this.filtered_users = this.users.filter(user => {
        return user.email?.toLowerCase().includes(value);
      })
    }
    
    if (type === 'name') {
      this.filtered_users = this.users.filter(user => {
        return user.name?.toLowerCase().includes(value);
      })
    }
  }
}
