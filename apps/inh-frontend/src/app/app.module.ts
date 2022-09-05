import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { HttpClientModule } from '@angular/common/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './components/basic/basic.component';
import { IdsnewComponent } from './components/idsnew/idsnew.component';
import { ClauseComponent } from './components/clause/clause.component';
import { AnycasePipe } from './pipes/anycase.pipe';
import { DatePipe } from '@angular/common';
import { ExcelPasteDirective } from './directives/excel-paste.directive';
import { IdsnewPasteComponent } from './components/idsnew-paste/idsnew-paste.component';
import { IdsnewPasteeditComponent } from './components/idsnew-pasteedit/idsnew-pasteedit.component';
import { IdsnewViewremoveComponent } from './components/idsnew-viewremove/idsnew-viewremove.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BasicComponent,
    IdsnewComponent,
    ClauseComponent,
    AnycasePipe,
    ExcelPasteDirective,
    IdsnewPasteComponent,
    IdsnewPasteeditComponent,
    IdsnewViewremoveComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    LayoutModule,
    HttpClientModule,
    InputsModule,
    ExcelExportModule,
    ReactiveFormsModule,
  ],
  providers: [AnycasePipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
