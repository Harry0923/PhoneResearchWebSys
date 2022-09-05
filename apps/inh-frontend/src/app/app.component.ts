import { VerificationService } from './services/verification.service';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'vghtc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '住院申報系統';
  isLogin = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  cardno = '';
  idno = '';

  constructor(private verifyService: VerificationService) {}

  /**
   * 系統關閉時, 移除的相關程序
   *
   * 20220803 yunteng: 新建, 同onDestory
   */
  onDestory() {
    //移除所有當前綁定中的訂閱狀態
    this.destroy$.next(true);
  }

  /**
   * 系統啟動時, 初始化程序內容
   *
   * 20220803 yunteng: 新建, 同ngOnInit
   */
  ngOnInit() {
    //訂閱登入認證狀態
    this.verifyService.isLogin$.pipe(takeUntil(this.destroy$)).subscribe(
      (status) => {
        this.isLogin = status;
        this.cardno = this.verifyService.getCardId;
        this.idno = this.verifyService.getUID;
      }
    )
  }

  onLogout() {
    this.verifyService.logout();
  }

}
