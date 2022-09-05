import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[vghtcExcelPaste]'
})
export class ExcelPasteDirective {

  //屬性回傳
  @Output()
  vghtcExcelPaste: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() {
    //
  }

  @HostListener("paste", ["$event"])
  public onPaste(e: any) {
    if (e.target.tageName && e.target.tagName.match(/(input|textarea)/i)) {
      //當input element被選中的時候, 不執行貼上動作
      return;
    }

    //從剪貼簿取得data, 資料型態為text
    const data = e.clipboardData.getData("text");

    //用hard code方式讀取TSV資料
    const rows = data.split("\n");
    let result = rows.map((row: any) => {
      const cells = row.split("\t");
      return {
        APPLY_YYMM: cells[0],
        CASENO: cells[1],
        APPLY_ST_DATE: cells[2],
        APPLY_END_DATE: cells[3],
        FINCNT: cells[4],
        CASE_TYPE: cells[5],
        SEQNO: cells[6],
        LAST_UPDATED_DATE: cells[7],
        LAST_UPDATED_ID: cells[8],
        IDS_TYPE: cells[9],
        REC_STATUS: cells[10],
        HFINANCIAL: cells[11],
        CHART_NO: cells[12],
        IDS_COUNT: cells[13],
        BED_STATUS: cells[14]
      };
    });

    result = result.filter((item: any) => {
      if (item.APPLY_YYMM !== '' && item.CASENO !== '' && item.APPLY_ST_DATE !== '' && item.APPLY_END_DATE !== '') {
        return item;
      } else {
        return;
      }
    })

    //發送到前端
    this.vghtcExcelPaste.emit(result);
  }

}
