import { DatePipe } from '@angular/common';
import { InhdataService } from './../../services/inhdata.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';

/**
 * 編輯貼上的EXCEL資料
 *
 * 20220812 yunteng: 補充紀錄和說明(建立者yunteng)
 */

@Component({
  selector: 'vghtc-idsnew-pasteedit',
  templateUrl: './idsnew-pasteedit.component.html',
  styleUrls: ['./idsnew-pasteedit.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class IdsnewPasteeditComponent implements OnInit{

  //存取來自上層的資料: excel貼上的呼吸切資料, 同時kendoGrid編輯資料也暫存於此
  //20220812 yunteng: 補充說明
  @Input()
  pasteData!: any[];

  //formGroup?.invalid === undefined ? false : formGroup!.invalid
  isFormValid = false;

  //宣告: 定義呈現呼吸切資料的formGroup
  //20220812 yunteng: 補充紀錄+說明
  public formGroup?: FormGroup;

  constructor(
    private inhdata: InhdataService,
    private dateFormat: DatePipe
  ) {}

  ngOnInit(): void {
    //建立createFormGroup提供前端kendoGridReactiveEditing功能綁定使用
    //20220812 yunteng: 補充紀錄+說明
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  //根據前端的kendo-grid產生formGroup
  //20220812 yunteng: 補充紀錄+說明
  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    //取得前端kendoGrid對應的資料列
    const dataItem =  args.dataItem;

    //根據資料列對應column定義FormGroup
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

    this.isFormValid = this.formGroup.invalid;

    return this.formGroup;
  }

  /**
   * 將編輯好的所有資料, 逐筆上傳到DB
   *
   * 20220812 yunteng: 補充紀錄+說明(建立者yunteng)
   */
  onUploadData() {
    let finalCaseno = '%';
    let finalChartno='%';

    //針對所有暫存資料進行操作
    this.pasteData.forEach((data: any) => {
      //自動產生當前日期 + 轉換指定日期格式
      data.LAST_UPDATED_DATE = this.dateFormat.transform(new Date(), 'yyyy/MM/dd HH:mm:ss');

      //debug呈現訊息, 查看處理資料基本資訊
      console.log(data.CASENO);
      console.log(data.APPLY_ST_DATE);
      console.log(data.LAST_UPDATED_DATE);

      //呼叫API執行DB操作
      /**
       * 規則: 上傳前, 需要先排除重複起迄日的資料, 避免重複申報
       *
       * 20220811 yunteng: 與楹楹討論後新增
       */
      //刪除重複起迄日的舊資料
      //20220811 yunteng: 新增排除舊資料程序
      this.inhdata.deleteOldIdsData(data).subscribe((res) => {
        console.log("<申報起訖日重疊舊資料刪除> 完成異動筆數: " + res);
      });
      //新增呼吸切資料
      //20220812 yunteng: 補充紀錄+說明
      this.inhdata.insertIdsData(data).subscribe((res) => {
        console.log("<新增呼吸切資料> 完成異動筆數: " + res);
      });

      //紀錄最後完成呼吸切上傳作業的必要查詢條件
      //20220812 yunteng: 修改畫面互動模式, 讓呼吸切完的資料可以即時成為查詢條件
      finalCaseno = data.CASENO;//住院序號
      finalChartno = data.CHART_NO;//病歷號
    })

    //將最新的查詢資料條件發佈出去(剛完成呼吸切的個案, 不需要考慮申報年月和身分證號)
    //20220812 yunteng: 修改畫面互動模式, 讓呼吸切完的資料可以即時查詢呈現
    this.inhdata.setClauses(finalCaseno, finalChartno, '%', '%');
  }
}
