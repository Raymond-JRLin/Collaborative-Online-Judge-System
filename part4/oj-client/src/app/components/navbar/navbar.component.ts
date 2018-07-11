import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Collaborative Online Judge System";

  username = "";

  searchBox: FormControl = new FormControl();
  subscription: Subscription;

  constructor(@Inject('auth') public auth,
              @Inject('input') private input,
              private router: Router) { }

  ngOnInit() {
    // show username if logged in
    if (this.auth.isAuthenticated()) {
        this.username = this.auth.getProfile().nickname;
    }

    this.subscription = this.searchBox
                            .valueChanges
                            .debounceTime(200) // catch events every 200ms
                            .subscribe(
                              term => {
                                this.input.changeInput(term);
                              }
                            );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);
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
