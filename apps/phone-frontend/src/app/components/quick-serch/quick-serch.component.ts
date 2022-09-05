import { forkJoin, map, Observable } from 'rxjs';
import { PhoneService } from './../../services/phone.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'vghtc-quick-serch',
  templateUrl: './quick-serch.component.html',
  styleUrls: ['./quick-serch.component.scss'],
})
export class QuickSerchComponent implements OnInit {
  searchText: any;
  phoneList = [];
  filteredPhoneList = [];
  User = [];
  public expandedDetailKeys: any[] = [17, 75];
  constructor(private phoneservice: PhoneService, private ng2Search: Ng2SearchPipe) { }

  ngOnInit(): void {
    forkJoin([this.phoneservice.getAllPhonesWithUser(), this.phoneservice.getAllPhoneCategories(), this.phoneservice.getAllPhoneFolders()])
   .pipe(
    map(
      ([phones, Categorys, phoneFolders]:any[]) => {
        phones.forEach((phone: any) => {
          phone.CATEGORY_NAME = (Categorys.find((Category: any) => Category.CATEGORY_ID ===
          phone.CATEGORY_ID))?.NAME;
          phone.FOLDER_NAME = (phoneFolders.find((phoneFolder: any) => phoneFolder.FOLDER_ID ===
          phone.FOLDER_ID))?.FOLDER_NAME;
        }
        )
        return phones
      }
    )
   )
   .subscribe(
    (phones: any) =>{
      this.phoneList = phones;
      this.filteredPhoneList = this.phoneList;
    }
   )
  }
  onSearchTextChange() {
    this.filteredPhoneList = this.ng2Search.transform(this.phoneList, this.searchText);
  }

  public expandDetailsBy = (dataItem: any): any => {
    return dataItem.PHONE_ID;
  }

  public trackBy = (idx: any, item: any) => item;
}
