import { VerificationService } from './../../services/verification.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vghtc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  /**
   * 登入資訊群組
   *
   * @param CardNo: 卡號
   * @param UidNo: 身分證號
   *
   * 20220808 yunteng: 修正變數名稱
   */
  loginFormGroup = new FormGroup({
    CardNo: new FormControl('', [Validators.required]),
    UidNo: new FormControl('', [Validators.required])
  })

  constructor(private verifyService: VerificationService) {}

  /**
   * (模擬)登入驗證, 取得登入資訊
   *
   * 20220808 yunteng: 修正變數名稱
   */
  onLogin() {
    //取得登入資訊, 代入驗證service進行身分驗證
    const{CardNo, UidNo} = this.loginFormGroup.value;
    this.verifyService.login(CardNo as string,UidNo as string);
  }
}
