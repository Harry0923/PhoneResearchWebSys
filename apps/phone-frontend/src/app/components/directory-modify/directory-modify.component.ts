import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs, EditEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { Subject } from 'rxjs';
import { PhoneService } from '../../services/phone.service';

@Component({
  selector: 'vghtc-directory-modify',
  templateUrl: './directory-modify.component.html',
  styleUrls: ['./directory-modify.component.scss'],
})
export class DirectoryModifyComponent implements OnInit {

  public phoneFolderList = [];
  public formGroup?: FormGroup;
  public openDialog = false;
  public information = "";
  public updateFolderId = "";
  // public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  // public itemToRemove : any;

  constructor(private phoneService : PhoneService, private formBuilder : FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
    // this.removeConfirmation = this.removeConfirmation.bind(this);
  }

  ngOnInit(): void {
    this.phoneService.getAllPhoneFolders().subscribe(
        (phoneFolders : any) => {
          this.phoneFolderList = phoneFolders;
        }
      );
  }

  public getFolder(folderId: string): any {
    return this.phoneFolderList.find((phoneFolder: any) => phoneFolder.FOLDER_ID === folderId);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} : args.dataItem;

    this.formGroup = this.formBuilder.group({
      PARENT_FOLDER_ID : [item.PARENT_FOLDER_ID, Validators.required],
      FOLDER_NAME : [item.FOLDER_NAME, Validators.required],
      FOLDER_ID : [item.FOLDER_ID, Validators.required],
      NOTE : [item.NOTE],
    });

    return this.formGroup;
  }
  public saveHandler({ formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.phoneService.createPhoneFolders(formGroup.value).subscribe(
        (response: any) => {
          console.log(response);
          if(response === 1){
            this.information = "新增成功";
          }
          else{
            this.information = "新增失敗";
          }
          this.openDialog = true;
        }
      );
    } else {
      this.phoneService.updatePhoneFolders(formGroup.value, this.updateFolderId).subscribe(
        (response: any) => {
          console.log(response);
          if(response !== 0){
            this.information = "修改成功";
          }
          else{
            this.information = "修改失敗";
          }
          this.openDialog = true;
        }
      );
    }
  }

  public removeHandler({ dataItem }: RemoveEvent) {
    this.phoneService.deletePhoneFolders(dataItem).subscribe(
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

  public editHandler(args : EditEvent){
    this.updateFolderId = args.dataItem.FOLDER_ID;

    const group = new FormGroup({
      'PARENT_FOLDER_ID': new FormControl(args.dataItem.PARENT_FOLDER_ID),
      'FOLDER_NAME': new FormControl(args.dataItem.FOLDER_NAME),
      'NOTE': new FormControl(args.dataItem.NOTE)
  });

  args.sender.editRow(args.rowIndex, group);
  }

  closeDialog(){
    this.openDialog = false;
  }

  // public confirmRemove(shouldRemove: boolean): void {
  //   this.removeConfirmationSubject.next(shouldRemove);
  //   this.itemToRemove = null;
  // }

  // public removeConfirmation(dataItem : any): Subject<boolean> {
  //   this.itemToRemove = dataItem;
  //   return this.removeConfirmationSubject;
  // }

}
