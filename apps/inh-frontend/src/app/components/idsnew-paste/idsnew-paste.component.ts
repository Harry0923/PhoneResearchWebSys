import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vghtc-idsnew-paste',
  templateUrl: './idsnew-paste.component.html',
  styleUrls: ['./idsnew-paste.component.scss'],
})
export class IdsnewPasteComponent {

  //輸出資料屬性: 負責向外傳遞貼上最終版的EXCEL資料
  //20220812 yunteng: 補充說明+紀錄
  @Output()
  newData: EventEmitter<any[]> = new EventEmitter<any[]>();

  //存放來自EXCEL貼上的資料
  //20220812 yunteng: 補充說明+紀錄
  public pasteData!: any[];

  //配合vghtcExcelPaste屬性, 接收來自EXCEL貼上的資料列
  //20220812 yunteng: 補充說明+紀錄
  onExcelPaste(data: any[]): void {
    this.pasteData = data;
  }

  //將最終蒐集好的資料列發送至上層component
  //20220812 yunteng: 補充說明+紀錄
  onSendData() {
    //向上層發送蒐集到的EXCEL資料列
    this.newData.emit(this.pasteData);
    //送出後, 清空資料列表示送出完成
    this.pasteData = [];
  }

}
