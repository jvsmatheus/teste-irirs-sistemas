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

  private service: UserService;
  private modal: MatDialog;
  users: User[];
  

  constructor(injector: Injector) {
    this.service = injector.get(UserService);
    this.modal = injector.get(MatDialog);
    this.users = [];
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.users = [];
    this.service.getUsers().subscribe(
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
        height: '550px',
        width: '450px',
      }
    );
    // this.service.createUser(user).subscribe(
    //   (data) => {
        
    //     console.log("User", data);
    //   }
    // )
  }

  deleteUser(id: number) {
    console.log(id);
    
    this.service.deleteUser(id).subscribe(
      (data) => {
        this.get();
        console.log("User deletado", data);
      }
    )
  }
}
