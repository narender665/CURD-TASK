import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  [x: string]: any;

  users!: User[];
  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonServiceService
    ) { }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(users => {
        this.users = users
        console.log(users)
      });
  }

  edit(User: any) {
    this.router.navigate(['edit/' + User.id]);
  }
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    if (!user) return;
    this.userService.delete(id)
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
  cloneUser(id:any) {
    this.commonService.setClone(true);
    this.router.navigate(['edit/' + id]);
  }
}
