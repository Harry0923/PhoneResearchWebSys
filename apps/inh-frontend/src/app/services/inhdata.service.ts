import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InhdataService {

  //住院序號
  private caseno = '';
  //病歷號(索引號)
  private chart_no = '';
  //個案身分證號
  private id_no = '';
  //申報年月
  private apply_yymm = '';


  public clauseData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  //設定必要查詢條件
  setClauses(caseNo: string, chartNo: string, idNo: string, applyYYMM: string) {
    //將代入值設定至全域變數
    this.caseno = caseNo;
    this.chart_no = chartNo;
    this.id_no = idNo;
    this.apply_yymm = applyYYMM;

    //將當前全域變數發佈出去
    this.clauseData.next({
      CASENO: this.caseno,
      CHART_NO: this.chart_no,
      APPLY_YYMM: this.apply_yymm,
      ID_NO: this.id_no
    });
  }

  //當前發佈資訊的訂閱方法
  getClauses(): Observable<any>{
    return this.clauseData.asObservable();
  }

  // public get getCaseno():string {
  //   return this.caseno;
  // }
  // public set setCaseno(caseno: string) {
  //   this.caseno = caseno;
  // }
  // public get getIdNo(): string {
  //   return this.id_no;
  // }
  // public set setIdNo(id_no: string) {
  //   this.id_no = id_no;
  // }
  // public get getChartNo():string {
  //   return this.chart_no;
  // }
  // public set setChartNo(chart_no: string) {
  //   this.chart_no = chart_no;
  // }
  // public get getApplyYYMM():string {
  //   return this.apply_yymm;
  // }
  // public set setApplyYYMM(apply_yymm: string) {
  //   this.apply_yymm = apply_yymm;
  // }

  constructor(private http: HttpClient) { }


  /**
   * 依指定條件, 從inh_basic取得個案瀏覽資料
   *
   * @param apply_yymm :申報年月
   * @param caseno :住院序號
   * @param chart_no :病歷號
   * @param id_no :身分證號
   *
   * 20220808 yunteng: 新建方法
   */
  getAllData(apply_yymm: string, caseno: string, chart_no: string, id_no: string) {
    return this.http.post('/InhBackend/general/query/selectAllData', {
      'schema': 'billing',
      'apply_yymm': apply_yymm,
      'caseno': caseno,
      'chart_no': chart_no,
      'id_no': id_no
    });
  }


  /**
   * 依指定條件, 從inh_basic取得個案瀏覽資料
   *
   * @param apply_yymm :申報年月
   * @param caseno :住院序號
   * @param chart_no :病歷號
   * @param id_no :身分證號
   *
   * 20220808 yunteng: 新建方法
   */
   getIdsData(apply_yymm: string, caseno: string, chart_no: string) {
    return this.http.post('/InhBackend/general/query/selectIdsData', {
      'schema': 'billing',
      'apply_yymm': apply_yymm,
      'caseno': caseno,
      'chart_no': chart_no
    });
  }


  insertIdsData(newdata: any) {
    return this.http.post('/InhBackend/general/manipulate/insertIdsData', {
      'schema': 'billing',
      'apply_yymm': newdata.APPLY_YYMM,
      'caseno': newdata.CASENO,
      'apply_st_date': newdata.APPLY_ST_DATE,
      'apply_end_date': newdata.APPLY_END_DATE,
      'fincnt': newdata.FINCNT,
      'case_type': newdata.CASE_TYPE,
      'seqno': newdata.SEQNO,
      'last_updated_date': newdata.LAST_UPDATED_DATE,
      'last_updated_id': newdata.LAST_UPDATED_ID,
      'ids_type': newdata.IDS_TYPE,
      'rec_status': newdata.REC_STATUS,
      'hfinancial': newdata.HFINANCIAL,
      'chart_no': newdata.CHART_NO,
      'ids_count': newdata.IDS_COUNT,
      'bed_status': newdata.BED_STATUS
    });
  }

  deleteIdsData(newdata: any) {
    return this.http.post('/InhBackend/general/manipulate/deleteIdsData', {
      'schema': 'billing',
      'apply_yymm': newdata.APPLY_YYMM,
      'caseno': newdata.CASENO,
      'apply_st_date': newdata.APPLY_ST_DATE,
      'apply_end_date': newdata.APPLY_END_DATE,
      'chart_no': newdata.CHART_NO
    });
  }

  deleteOldIdsData(newdata: any) {
    return this.http.post('/InhBackend/general/manipulate/deleteOldIdsData', {
      'schema': 'billing',
      'apply_yymm': newdata.APPLY_YYMM,
      'caseno': newdata.CASENO,
      'apply_st_date': newdata.APPLY_ST_DATE,
      'apply_end_date': newdata.APPLY_END_DATE
    });
  }


}

