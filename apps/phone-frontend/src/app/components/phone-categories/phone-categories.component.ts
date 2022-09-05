import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { forkJoin } from 'rxjs';
import { PhoneService } from '../../services/phone.service';

@Component({
  selector: 'vghtc-phone-categories',
  templateUrl: './phone-categories.component.html',
  styleUrls: ['./phone-categories.component.scss'],
})
export class PhoneCategoriesComponent implements OnInit {
  public phoneFolderList = [];
  public phoneCategoryList = [];
  public formGroup?: FormGroup;
  public openDialog = false;
  public information = "";
  // public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  // public itemToRemove : any;

  constructor(private phoneService : PhoneService, private formBuilder : FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
    // this.removeConfirmation = this.removeConfirmation.bind(this);
  }

  ngOnInit(): void {
    this.getPhoneCategoryData();
  }

  public getFolder(folderId: string): any {
    return this.phoneFolderList.find((phoneFolder: any) => phoneFolder.FOLDER_ID === folderId);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      FOLDER_ID : [item.FOLDER_ID, Validators.required],
      NAME : [item.NAME, Validators.required],
      CATEGORY_ID : [item.CATEGORY_ID],
    });

    return this.formGroup;
  }

  // public confirmRemove(shouldRemove: boolean): void {
  //   this.removeConfirmationSubject.next(shouldRemove);
  //   this.itemToRemove = null;
  // }

  // public removeConfirmation(dataItem : any): Subject<boolean> {
  //   this.itemToRemove = dataItem;
  //   return this.removeConfirmationSubject;
  // }

  public saveHandler({ formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.phoneService.createPhoneCategories(formGroup.value).subscribe(
        (response: any) => {
          console.log(response);
          if(response === 1){
            this.information = "新增成功";
          }
          else{
            this.information = "新增失敗";
          }
          this.getPhoneCategoryData();
        }
      );
    } else {
      this.phoneService.updatePhoneCategories(formGroup.value).subscribe(
        (response: any) => {
          console.log(response);
          if(response !== 0){
            this.information = "修改成功";
          }
          else{
            this.information = "修改失敗";
          }
        }
      );
    }
    this.openDialog = true;
  }

  public removeHandler({ dataItem }: RemoveEvent) {
    this.phoneService.deletePhoneCategories(dataItem).subscribe(
      (response: any) => {
        console.log(response);
        if(response !== 0){
          this.information = "刪除成功"
        }
        else{
          this.information = "刪除失敗";
        }
        this.openDialog = true;
      }
    );
  }

  closeDialog(){
    this.openDialog = false;
  }

  getPhoneCategoryData(){
    forkJoin([this.phoneService.getAllPhoneFolders(), this.phoneService.getAllPhoneCategories()])
    .subscribe(
      ([phoneFolders, phoneCategories]: any[]) => {
        this.phoneFolderList = phoneFolders;
        this.phoneCategoryList = phoneCategories;
      }
    );
  }
}
