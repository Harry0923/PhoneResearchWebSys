import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  private cardid: string;
  private uid: string;
  public get getCardId() {
    return this.cardid;
  }
  public get getUID() {
    return this.uid;
  }

  private isLoginStatus = new BehaviorSubject<boolean>(false);
  public isLogin$: Observable<boolean>;

  constructor() {
    this.isLogin$ = this.isLoginStatus.asObservable();
    this.cardid = '';
    this.uid = '';
  }

  login(user: string, userid: string) {
    this.cardid = user;
    this.uid = userid;
    this.isLoginStatus.next(true);
  }

  logout() {
    this.cardid = '';
    this.uid = '';
    this.isLoginStatus.next(false);
  }
}
