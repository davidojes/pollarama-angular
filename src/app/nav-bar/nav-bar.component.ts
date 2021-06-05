import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLoggedIn
  userName

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userLoggedIn = this.userService.getUserLoggedIn();
    if (this.userLoggedIn) this.userName = this.userService.getUserName();
  }

  async logout() {
    await this.userService.logout()
    .then(response => {console.log(response); this.router.navigate(['/login']);})
    .catch(error => console.log(error));

    
  }

}
