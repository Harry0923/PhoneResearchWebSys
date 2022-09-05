import { Component, OnInit } from '@angular/core';

/**
 * 呼吸切帳功能主要頁面, 控制畫面中提供的相關操作功能
 *
 * ids-paste: 接收從EXCEL貼上的資料
 * isd-pasteedit: 編輯來自EXCEL的資料
 * ids-viewremove: 瀏覽資料和刪除單筆資料
 *
 * 20220812 yunteng: 補充紀錄及說明(建立者yunteng)
 */

@Component({
  selector: 'vghtc-idsnew',
  templateUrl: './idsnew.component.html',
  styleUrls: ['./idsnew.component.scss'],
})
export class IdsnewComponent implements OnInit {

  //資料庫查詢資料集
  //20220812 yunteng: 補充說明+紀錄
  dataList: any[] = [];
  //EXCEL貼上資料集
  //20220812 yunteng: 補充說明+紀錄
  data: any[] = [];

  //是否呈現瀏覽個案資料(含單筆刪除功能)
  //20220812 yunteng: 補充說明+紀錄
  isViewEdit?: boolean;
  //是否為貼上EXCEL資料狀態
  //20220812 yunteng: 補充說明+紀錄
  isPaste?: boolean;


  ngOnInit(): void {
    //個案瀏覽編輯介面一開始預設不呈現
    //20220811 yunteng: 調整預設呈現模式
    this.isViewEdit = false;
    //預設一開始來到編輯介面時, 呈現excel貼上操作介面
    //20220811 yunteng: 調整預設呈現模式
    this.isPaste = true;
  }

  //重複點選觸發, 讓畫面可以呈現或隱藏
  //20220811 yunteng: 調整功能
  toViewData() {
    this.isViewEdit = !this.isViewEdit;
  }

  //資料匯入操作: 從excel貼上資料
  //20220811 yunteng: 調整功能
  toPasteData() {
    this.isPaste = true;
  }
  //資料匯入操作: 編輯來自excel的資料
  //20220811 yunteng: 調整功能
  toPasteEdit() {
    this.isPaste = false;
  }

  //接收來自idsnew-paste送出後,EventEmitter傳遞來的所有資料列
  //20220812 yunteng: 調整功能
  getPasteData($event: any[]) {
    this.data = $event;
  }

}
