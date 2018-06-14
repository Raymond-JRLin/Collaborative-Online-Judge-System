import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Http, Response, Headers } from '@angular/http';

// avoid name not found warnings
// declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // configure Auth0
  clientId = 'Z-GnGnRCV8i4fg_MoaxyGjze_LidaA_v';
  domain = 'raymondcoj.auth0.com';
  // lock = new Auth0Lock(this.clientId, this.domain, {});
  auth0 = new auth0.WebAuth({
    clientID: this.clientId,
    domain: this.domain,
    responseType: 'token id_token',
    audience: 'https://raymondcoj.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router, private http: Http) {
    // add callback for lock 'authenticated' event
    // this.lock.on("authenticated", (authResult) => {
    //   localStorage.setItem('id_token', authResult.idToken);
    // });
  }

  public login() {
    // call the show method to display the widget
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          // const accessToken = authResult.accessToken;
          // this.auth0.client.userInfo(accessToken, (error: string, profile: Object) => {
          //   localStorage.setItem('profil', JSON.stringify(profile));
          //   this.setSession(authResult);
          //   window.location.href = localStorage.getItem('curLocation');
          //   console.log(this.auth0);
          //   console.log('handle authentication');
          // });
          this.setSession(authResult);
          this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // console.log('set session');
  }

  public authenticated() {
    // check if there's an unexpired JWT
    // this searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public resetPassword(): Object {
    const options = {headers: new Headers({'Content-Type': 'application/json'})};
    const body = {
      client_id: this.clientId,
      email: this.getProfile().email,
      connection: 'Username-Password-Authentication'
    };
    const url = 'https://$({this.domain})/dbconnections/change_password';
    return this.http.post(url, body, options)
      .toPromise()
      .then((res: Response) => {
        console.log(res);
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error Occurred', error);
    return Promise.reject(error.message || error);
  }

  // public getRoles(): Object {
  //   const appData = 'https://coj-authorization-domain.com/app_metadata';
  //   return this.getProfile()[appData].authorization.roles;
  // }

}
