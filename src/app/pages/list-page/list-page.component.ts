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
  is_edit: boolean;
  

  constructor(
    private user_service: UserService,
    private modal: MatDialog,
  ) {
    this.users = [];
    this.is_edit = false;
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
        console.log("Users", this.users);
      }
    )
  }

  createUser() {
    let modal = this.modal.open(
      CreateComponent,
      {
        height: '475px',
        width: '450px',
        data: {
          is_edit: this.is_edit,
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
}
