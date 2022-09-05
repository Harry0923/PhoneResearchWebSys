import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'vghtc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginData = {
    isLogin : false,
    token : "",
  }

  public username = "";
  public openDialog = false;

  constructor(private authService : AuthService,
              private router: Router) {}

  ngOnInit(): void {

  }

  login(username : string, password: string){
    this.authService.login(username, password).subscribe(
      (data: any) => {
        this.loginData.isLogin = data.isLogIn;
        this.loginData.token = data.token;
      }
    );

    if(this.loginData.isLogin === true && this.loginData.token === '12345'){
      this.username = username;
      this.router.navigate(['home']);
    }
    else{
      this.loginData.isLogin = false;
      this.openDialog = true;
    }
  }

  closeDialog(){
    this.openDialog = false
  }
}
