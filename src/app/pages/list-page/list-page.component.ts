import { Component, Injector, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-list-page',
  standalone: false,
  
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit{

  private service: UserService;

   constructor(injector: Injector) {
      this.service = injector.get(UserService);
    }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.service.getUsers().subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

}
