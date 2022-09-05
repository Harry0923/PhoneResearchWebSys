import { PhoneUserComponent } from './components/phone-user/phone-user.component';
import { HomeComponent } from './components/home/home.component';
import { BadgeModule } from '@progress/kendo-angular-indicators';
import { RouterModule, Routes } from '@angular/router';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ExcelModule,
  GridModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoginComponent } from './components/login/login.component';
import { DirectoryModifyComponent } from './components/directory-modify/directory-modify.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { PhoneService } from './services/phone.service';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { QuickSerchComponent } from './components/quick-serch/quick-serch.component';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddPhoneComponent } from './components/add-phone/add-phone.component';
import { IconModule } from '@progress/kendo-angular-icons';
import { HeaderComponent } from './components/header/header.component';
import { MenusModule } from '@progress/kendo-angular-menu';
import { IndexComponent } from './components/index/index.component';
import { PhoneCategoriesComponent } from './components/phone-categories/phone-categories.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: '', component: IndexComponent, pathMatch: 'full'},
    { path: 'add-phone', component: AddPhoneComponent},
    { path: 'quick-serch', component: QuickSerchComponent},
    { path: 'directory-modify', component: DirectoryModifyComponent},
    { path: 'phone-categories', component: PhoneCategoriesComponent},
    { path:'phone-user',component:PhoneUserComponent}
  ]},

];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    QuickSerchComponent,
    LoginComponent,
    DirectoryModifyComponent,
    AddPhoneComponent,
    HeaderComponent,
    IndexComponent,
    PhoneCategoriesComponent,
    HomeComponent,
    PhoneUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    LayoutModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    DialogModule,
    Ng2SearchPipeModule,
    DropDownsModule,
    Ng2SearchPipeModule,
    PDFModule,
    ExcelModule,
    MenusModule,
    RouterModule.forRoot(appRoutes),
    IconModule,
    BadgeModule,
  ],
  providers: [AuthService, PhoneService, Ng2SearchPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
