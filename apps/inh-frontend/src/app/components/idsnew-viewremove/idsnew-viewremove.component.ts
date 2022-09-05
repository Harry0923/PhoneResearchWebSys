import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs, RemoveEvent } from '@progress/kendo-angular-grid';
import { InhdataService } from '../../services/inhdata.service';

@Component({
  selector: 'vghtc-idsnew-viewremove',
  templateUrl: './idsnew-viewremove.component.html',
  styleUrls: ['./idsnew-viewremove.component.scss'],
})
export class IdsnewViewremoveComponent implements OnInit {

  //所有查詢結果資料列
  dataList: any[] = [];
  public formGroup?: FormGroup;

  destory$: Subject<boolean>= new Subject<boolean>();

  //需要進行刪除的資料暫存陣列
  deleteList: any[] = [];

  constructor(
    private inhdata: InhdataService,
    private dataFormat: DatePipe
  ) { }

  ngOnInit(): void {

    //持續訂閱最新的個案基本資料, 讓查詢表格可以即時呈現新指定個案的資料
    //20220812 yunteng: 調整畫面互動模式, 即時反應新設定個案條件的查詢結果
    this.inhdata.getClauses().pipe(takeUntil(this.destory$)).subscribe((data: any) => {
      //debug用log訊息
      console.log(data.APPLY_YYMM);
      console.log(data.CASENO);
      console.log(data.CHART_NO);
      //執行查詢更新表格資料
      this.doIdsSelect(data.APPLY_YYMM, data.CASENO, data.CHART_NO);
    });


    this.createFormGroup = this.createFormGroup.bind(this);

  }

  onDestory(): void {
    this.destory$.next(true);
  }


  /**
   * 依條件查詢取得所有相關資訊
   *
   * 20220808 yunteng: 新建方法
   */
  doIdsSelect(applyYYMM: string, caseNo: string, chartNo: string) {

    //如果全部條件都沒有設定的話, 不執行
    if (applyYYMM !== '%' || caseNo !== '%' || chartNo !== '%') {
      //debug log
      console.log("有設定任一條件, 依條件執行呼吸切帳查詢");

      //有設定任一條件, 依條件執行呼吸切帳查詢
      this.inhdata.getIdsData(applyYYMM, caseNo, chartNo).subscribe(
        (data: any) => {
          this.dataList = data;
          console.log("完成呼吸切帳資料查詢動作");//debug log
        }
      );
    }
  }

  removeHandler(args: RemoveEvent) {
    this.deleteList.push(args.dataItem as any);
  }


  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;

    this.formGroup = new FormGroup({
      APPLY_YYMM: new FormControl(dataItem.APPLY_YYMM),
      CASENO: new FormControl(dataItem.CASENO, Validators.required),
      APPLY_ST_DATE: new FormControl(dataItem.APPLY_ST_DATE),
      APPLY_END_DATE: new FormControl(dataItem.APPLY_END_DATE),
      FINCNT: new FormControl(dataItem.FINCNT),
      CASE_TYPE: new FormControl(dataItem.CASE_TYPE),
      SEQNO: new FormControl(dataItem.SEQNO),
      LAST_UPDATED_DATE: new FormControl(dataItem.LAST_UPDATED_DATE),
      LAST_UPDATED_ID: new FormControl(dataItem.LAST_UPDATED_ID),
      IDS_TYPE: new FormControl(dataItem.IDS_TYPE),
      REC_STATUS: new FormControl(dataItem.REC_STATUS),
      HFINANCIAL: new FormControl(dataItem.HFINANCIAL),
      CHART_NO: new FormControl(dataItem.CHART_NO),
      IDS_COUNT: new FormControl(dataItem.IDS_COUNT),
      BED_STATUS: new FormControl(dataItem.BED_STATUS),
    });

    return this.formGroup;
  }

  /**
   * 從瀏覽資料介面, 刪除所有選擇的單筆資料
   *
   * 20220812 yunteng: 補充紀錄+說明
   */
  onDeleteData() {
    //對暫存紀錄中所有資料列進行刪除動作
    this.deleteList.forEach((data: any) => {
      //配合後端接收日期格式進行轉換
      data.APPLY_ST_DATE = this.dataFormat.transform(data.APPLY_ST_DATE, "yyyy/MM/dd");
      data.APPLY_END_DATE = this.dataFormat.transform(data.APPLY_END_DATE, "yyyy/MM/dd");

      //debug用查看訊息
      console.log(data.CASENO);
      console.log(data.APPLY_YYMM);
      console.log(data.CHART_NO);
      console.log(data.APPLY_ST_DATE);
      console.log(data.APPLY_END_DATE);

      //呼叫API, 執行單筆資料刪除
      this.inhdata.deleteIdsData(data).subscribe((res) => {
        console.log("<單筆資料刪除> 完成異動筆數: " + res);
      })
    })

    //完成刪除動作後, 清空暫存資料列
    this.deleteList = [];
  }
}
