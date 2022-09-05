import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { forkJoin } from 'rxjs';
import { PhoneService } from '../../services/phone.service';

@Component({
  selector: 'vghtc-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.scss'],
})
export class AddPhoneComponent implements OnInit {
  phoneList = [];
  phoneFolderList = [];
  phoneCategoryList = [];
  num: any;
  public formGroup?: FormGroup;
  public openDialog = false;
  public information = "";
  // public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  // public itemToRemove : any;
  data:any;
  ngOnInit(): void {
    this.getAddPhoneData();
  }
  getAddPhoneData(){
    forkJoin([this.phoneService.getAllPhones(), this.phoneService.getAllPhoneFolders(), this.phoneService.getAllPhoneCategories()])
      .subscribe(
        ([phones, phoneFolders, phoneCategories]: any[]) => {
          this.phoneList = phones;
          this.phoneFolderList = phoneFolders;
          this.phoneCategoryList = phoneCategories;
        }
      );
  }
  constructor(
    private phoneService: PhoneService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
    // this.removeConfirmation = this.removeConfirmation.bind(this);
  }
  // public confirmRemove(shouldRemove: boolean): void {
  //   this.removeConfirmationSubject.next(shouldRemove);
  //   this.itemToRemove = null;
  // }

  // public removeConfirmation(dataItem : any): Subject<boolean> {
  //   this.itemToRemove = dataItem;
  //   return this.removeConfirmationSubject;
  // }

  public getFolder(folderId: string): any {
    return this.phoneFolderList.find((phoneFolder: any) => phoneFolder.FOLDER_ID === folderId);
  }

  public getCategory(categoryId: string): any {
    return this.phoneCategoryList.find((phoneCategory: any) => phoneCategory.CATEGORY_ID === categoryId);
  }

  public saveHandler({ formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.phoneService.createPhone(formGroup.value).subscribe(
        (response: any) => {
          if(response === 1){
            this.num=response;
            this.information = "已新增1筆資料";
            this.getAddPhoneData();

          }
          else{
            this.num=response;
            this.information = "新增失敗";
          }
          this.openDialog = true;
        }
      );
    } else {
      this.phoneService.updatePhone(formGroup.value).subscribe(
        (response: any) => {
          if(response === 1){
            this.num=response;
            this.information = "已修改1筆資料";
          }
          else{
            this.num=response;
            this.information = "修改失敗";
          }
          this.openDialog = true;
        }
      );
    }
  }

  public removeHandler({ dataItem }: RemoveEvent) {
    this.phoneService.deletePhone(dataItem).subscribe(
      (response: any) => {
        if(response === 1){
          this.num=response;
          this.information = "已刪除1筆資料";
          this.data=dataItem;
          console.log(dataItem.PHONE_ID);
        }
        else{
          this.num=response;
          this.information = "刪除失敗";
        }
        this.openDialog = true;
      }
    );
  }
  closeDialog(){
    this.openDialog = false;
  }
  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      PHONE_ID: [item.PHONE_ID, Validators.required],
      FOLDER_ID: [item.FOLDER_ID, Validators.required],
      CATEGORY_ID: [item.CATEGORY_ID],
      NAME: [item.NAME],
      INPHONE: [item.INPHONE, Validators.required],
      OUTPHONE: [item.OUTPHONE],
      NOTE: [item.NOTE]
    });

    return this.formGroup;
  }


}
