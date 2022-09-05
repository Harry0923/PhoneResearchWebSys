import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CreateFormGroupArgs, EditEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { forkJoin } from 'rxjs';
import { PhoneService } from '../../services/phone.service';


@Component({
  selector: 'vghtc-phone-user',
  templateUrl: './phone-user.component.html',
  styleUrls: ['./phone-user.component.scss'],
})
export class PhoneUserComponent implements OnInit {
  phoneList = [];
  phoneUserList = [];
  phoneFolderList = [];
  filteredPhoneList = [];
  filteredPhoneFolderList = [];
  selectedFolderId?: string;
  searchText: any;
  formGroup?: FormGroup;
  openDialog = false;
  information = "";

  constructor(
    private phoneService: PhoneService,
    private formBuilder: FormBuilder,
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.getGridData();
  }

  public getGridData() {
    forkJoin([this.phoneService.getAllPhones(), this.phoneService.getAllPhoneFolders(), this.phoneService.getAllPhoneUsers()])
      .subscribe(
        ([phones, phoneFolders, phoneUsers]: any[]) => {
          this.phoneList = phones;
          this.phoneFolderList = phoneFolders;
          this.phoneUserList = phoneUsers;

          this.filteredPhoneFolderList = this.phoneFolderList;
          this.filteredPhoneList = this.phoneList;
        }
      );
  }

  public getFolder(folderId: string): any {
    return this.phoneFolderList.find((phoneFolder: any) => phoneFolder.FOLDER_ID === folderId);
  }

  public getPhone(phoneid: string): any {
    return this.phoneList.find((phone: any) => phone.PHONE_ID === phoneid)
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      ID: [item.ID],
      PHONE_ID: [item.PHONE_ID, Validators.required],
      USER_ID: [item.USER_ID],
      USER_NAME: [item.USER_NAME, Validators.required],
      USER_NAME_HEX: [item.USER_NAME_HEX],
      OUTEMAIL: [item.OUTMAIL]
    });

    return this.formGroup;
  }

  public editHandler({ dataItem, isNew }: EditEvent) {
    if (!isNew) {
      this.selectedFolderId = this.getPhone(dataItem.PHONE_ID).FOLDER_ID;
      this.handleFolderChange(this.selectedFolderId);
    }
  }

  public saveHandler({ formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.phoneService.createPhoneUser(formGroup.value).subscribe(
        (response: any) => {
          if (response === 1) {
            this.information = `已新增${response}筆資料`;
            this.getGridData();
          }
          else {
            this.information = "新增失敗";
          }
          this.openDialog = true;
        }
      );
    } else {
      this.phoneService.updatePhoneUser(formGroup.value).subscribe(
        (response: any) => {
          if (response === 1) {
            this.information = `已修改${response}筆資料`;
          }
          else {
            this.information = "修改失敗";
          }
          this.openDialog = true;
        }
      );
    }
  }

  public removeHandler({ dataItem }: RemoveEvent) {
    this.phoneService.deletePhoneUser(dataItem).subscribe(
      (response: any) => {
        if (response === 1) {
          this.information = `已刪除${response}筆資料`;
        }
        else {
          this.information = "刪除失敗";
        }
        this.openDialog = true;
      }
    );
  }

  public onSearchTextChange() {
    this.filteredPhoneFolderList = this.phoneFolderList.filter((phoneFolder: any) => phoneFolder.FOLDER_NAME?.includes(this.searchText));
  }

  public handleFolderChange(folderId: any) {
    this.filteredPhoneList = this.phoneList.filter((phone: any) => phone.FOLDER_ID === folderId);
  }
  closeDialog(){
    this.openDialog = false;
  }
}
