import { InhdataService } from './../../services/inhdata.service';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'vghtc-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {

  dataList = [];
  destory$: Subject<boolean> = new Subject<boolean>();

  constructor(private inhdata: InhdataService) { }

  ngOnInit(): void {

    //持續訂閱最新的個案基本資料, 讓查詢表格可以即時呈現新指定個案的資料
    //20220812 yunteng: 調整畫面互動模式, 即時反應新設定個案條件的查詢結果
    this.inhdata.getClauses().pipe(takeUntil(this.destory$)).subscribe((data: any) => {
      //debug用log訊息
      console.log(data.APPLY_YYMM);
      console.log(data.CASENO);
      console.log(data.CHART_NO);
      console.log(data.ID_NO);
      //執行查詢更新表格資料
      this.doBasicSelect(data.APPLY_YYMM, data.CASENO, data.CHART_NO, data.ID_NO);
    });

  }

  /**
   * 依條件查詢取得所有相關資訊
   *
   * 20220808 yunteng: 新建方法
   */
  doBasicSelect(caseNo: string, applyYYMM: string, chartNo: string, idNo: string) {
    //如果全部條件都沒有設定的話, 不執行
    if (applyYYMM !== '%' || caseNo !== '%' || chartNo !== '%' || idNo !== '%') {
      console.log("有設定任一條件, 依條件執行個案查詢");//debug log
      //有設定任一條件, 依條件執行個案查詢
      this.inhdata.getAllData(applyYYMM, caseNo, chartNo, idNo).subscribe(
        (data: any) => {
          this.dataList = data;
          console.log("完成個案資料查詢動作");//debug log
        }
      );
    }
  }

}
