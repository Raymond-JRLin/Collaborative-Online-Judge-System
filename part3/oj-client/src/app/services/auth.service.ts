import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // configure Auth0
  clientId = 'Z-GnGnRCV8i4fg_MoaxyGjze_LidaA_v';
  domain = 'raymondcoj.auth0.com';
  lock = new Auth0Lock(this.clientId, this.domain, {});

  constructor() {
    // add callback for lock 'authenticated' event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // call the show method to display the widget
    this.lock.show();
  }

  public authenticated() {
    // check if there's an unexpired JWT
    // this searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // remove token from localStorage
    localStorage.removeItem('id_token');
  }

}
