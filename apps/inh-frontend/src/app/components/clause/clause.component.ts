import { InhdataService } from './../../services/inhdata.service';
import { AnycasePipe } from './../../pipes/anycase.pipe';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

/**
 * 設定全域查詢個案的where條件資料
 *
 * 20220812 yunteng: 補充紀錄及說明(建立者: yunteng)
 */

@Component({
  selector: 'vghtc-clause',
  templateUrl: './clause.component.html',
  styleUrls: ['./clause.component.scss'],
})
export class ClauseComponent implements OnInit {

  //住院序號
  caseno = '';
  //病歷號(索引號)
  chart_no = '';
  //個案身分證號
  id_no = '';
  //申報年月
  apply_yymm = '';

  destory$: Subject<boolean> = new Subject<boolean>();


  /**
   * 查詢個案條件群組
   *
   * @param Caseno: 住院序號
   * @param Id_No: 身分證號
   * @param Chart_No: 病歷號
   * @param ApplyYYMM: 申報年月
   */
  clauseFormGroup = new FormGroup({
    Caseno: new FormControl('', []),
    Id_No: new FormControl('', []),
    Chart_No: new FormControl('', []),
    ApplyYYMM: new FormControl('', []),
  });

  constructor(
    private anycase: AnycasePipe,
    private inhdata: InhdataService
  ) { }

  ngOnInit(): void {
    this.inhdata.getClauses().subscribe((data: any) => {
      this.caseno = data.CASENO;
      this.apply_yymm = data.APPLY_YYMM;
      this.chart_no = data.CHART_NO;
      this.id_no = data.ID_NO;
    })
  }

  /**
   * 設定更換查詢個案基本資訊
   *
   * 20220812 yunteng: 補充紀錄+說明
   */
  changeCaseData() {
    //存取設定參數
    const { Caseno, Id_No, Chart_No, ApplyYYMM } = this.clauseFormGroup.value;

    //設定至inhdataservice
    this.inhdata.setClauses(
      this.anycase.transform(Caseno as string, '%'),
      this.anycase.transform(Chart_No as string, '%'),
      this.anycase.transform(Id_No as string, '%'),
      this.anycase.transform(ApplyYYMM as string, '%')
    );

  }

}
