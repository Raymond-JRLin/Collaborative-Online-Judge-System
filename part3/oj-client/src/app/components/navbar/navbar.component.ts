import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Collaborative Online Judge System";

  username = "";

  constructor( @Inject('auth') public auth) { }

  ngOnInit() {
    // show username if logged in
    if (this.auth.isAuthenticated()) {
        this.username = this.auth.getProfile().nickname;
    }
  }

  login(): void {
    localStorage.setItem('curLocation', window.location.href);
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
    localStorage.removeItem('curLocation');
  }

}
