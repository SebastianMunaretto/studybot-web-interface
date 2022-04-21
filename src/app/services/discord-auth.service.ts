import { StudybotApi } from 'src/app/types/apiTypes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import "chartjs-adapter-moment";


@Injectable({
  providedIn: 'root'
})
export class DiscordAuthService {

  // server domain
  domain = "https://studybot.it";
  authDomain = "https://auth.studybot.it";
  apiDomain = "https://api.studybot.it";
  loggedIn!: boolean;
  options!: any;

  constructor(private _http: HttpClient, private _router: Router, private jwtHelper: JwtHelperService) { }

  loadToken(): any {
    return localStorage.getItem('token');
  }

  createAuthenticationHeadersWithObserve(): any {
    // options variable should be created
    return {
      headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.loadToken(), }),
      observe: 'response',
      responseType: 'text' as 'json'
    }
  }

  createAuthenticationHeaders(): any {
    // options variable should be created
    return {
      headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.loadToken(), })
    }
  }

  getUserData(): Observable<any> {
    return this._http.get(this.apiDomain + '/user/me', this.createAuthenticationHeaders());
  }

  storeUserData(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn = true;
    this._router.navigate(['login'])
  }

  checkTokenValidity(): boolean {
    try {
      let token: string | null;
      token = localStorage.getItem("token");
      if (token && !this.jwtHelper.isTokenExpired(token ?? ""))
        return true;
      else
        return false;
    } catch {
      return false;
    }
  }

  logoutUser() {
    localStorage.clear();
    this.loggedIn = false;
  }

  getToDoList(): Observable<any> {
    return this._http.get(this.apiDomain + '/todo/all', this.createAuthenticationHeaders());
  }

  deleteTasks(): Observable<any> {
    return this._http.delete(this.apiDomain + '/todo/all', this.createAuthenticationHeadersWithObserve());
  }

  toggleCompleteTask(task: any): Observable<any> {
    return this._http.put(this.apiDomain + '/todo/' + task._id, task, this.createAuthenticationHeadersWithObserve());
  }

  addTask(task: Task): Observable<any> {
    return this._http.post(this.apiDomain + '/todo', task, this.createAuthenticationHeadersWithObserve());
  }

  setTimer(studyTime: number, breakTime: number): Observable<any> {
    return this._http.post(this.apiDomain + '/timer', { studyTime: studyTime, breakTime: breakTime }, this.createAuthenticationHeadersWithObserve());
  }

  getTimer(): Observable<any> {
    return this._http.get(this.apiDomain + '/timer', this.createAuthenticationHeaders());
  }

  getDigregGrades(): Observable<any> {
    return this._http.get(this.apiDomain + '/digreg/grades', this.createAuthenticationHeaders());
  }

  loginDigreg(digregToken: string): Observable<any> {
    return this._http.post(this.authDomain + '/auth/linkDigreg', { digregToken }, this.createAuthenticationHeadersWithObserve());
  }

  logoutDigreg(): Observable<any> {
    return this._http.post(this.authDomain + '/auth/unlinkDigreg',{}, this.createAuthenticationHeadersWithObserve());
  }

}
