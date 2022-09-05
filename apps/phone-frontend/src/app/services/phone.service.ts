import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  getAllPhonesWithUser() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhonesWithUser', {
      'schema': 'portdb',
      "hospital": "VGHTC"
    });
  }

  getAllPhones() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhones', {
      'schema': 'portdb'
    });
  }
  getAllPhonesUsers() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhoneUsers', {
      'schema': 'portdb'
    });
  }

  createPhone(phone: any) {
    return this.http.post('/PhoneBackend/general/manipulate/insertPhone', {
      'schema': 'portdb',
      ...phone
    });
  }

  updatePhone(phone: any) {
    return this.http.post('/PhoneBackend/general/manipulate/updatePhoneByPhoneId', {
      'schema': 'portdb',
      ...phone
    });
  }

  deletePhone(phone: any) {
    return this.http.post('/PhoneBackend/general/manipulate/deletePhoneByPhoneId', {
      'schema': 'portdb',
      ...phone
    });
  }

  getAllPhoneFolders() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhoneFolders', {
      'schema': 'portdb'
    });
  }

  createPhoneFolders(phoneFolders: any) {
    return this.http.post('/PhoneBackend/general/manipulate/insertPhoneFolder', {
      'schema': 'portdb',
      ...phoneFolders,
      "CREATOR": "CC4F"
    });
  }

  updatePhoneFolders(phoneFolders: any, folderId: string) {
    return this.http.post('/PhoneBackend/general/manipulate/updatePhoneFolderByFolderId', {
      'schema': 'portdb',
      "FOLDER_ID": folderId,
      ...phoneFolders,
      "MODIFIER": "CC4F"
    });
  }

  deletePhoneFolders(phoneFolders: any) {
    return this.http.post('/PhoneBackend/general/manipulate/deletePhoneFolderByFolderId', {
      'schema': 'portdb',
      ...phoneFolders
    });
  }

  getAllPhoneCategories() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhoneCategories', {
      'schema': 'portdb'
    });
  }

  createPhoneCategories(phoneCategories: any) {
    return this.http.post('/PhoneBackend/general/manipulate/insertPhoneCategory', {
      'schema': 'portdb',
      ...phoneCategories,
      "CREATOR": "CC4F"
    });
  }

  updatePhoneCategories(phoneCategories: any) {
    return this.http.post('/PhoneBackend/general/manipulate/updatePhoneCategoryByCategoryId', {
      'schema': 'portdb',
      ...phoneCategories,
      "MODIFIER": "CC4F"
    });
  }

  deletePhoneCategories(phoneCategories: any) {
    return this.http.post('/PhoneBackend/general/manipulate/deletePhoneCategoryByCategoryId', {
      'schema': 'portdb',
      ...phoneCategories
    });
  }

  getAllPhoneUsers() {
    return this.http.post('/PhoneBackend/general/query/selectAllPhoneUsers', {
      'schema': 'portdb'
   });
  }

  createPhoneUser(phoneUser: any) {
    return this.http.post('/PhoneBackend/general/manipulate/insertPhoneUser', {
      'schema': 'portdb',
      ...phoneUser,
      "CREATOR": "CC4F"
    });
  }

  updatePhoneUser(phoneUser: any) {
    return this.http.post('/PhoneBackend/general/manipulate/updatePhoneUserById', {
      'schema': 'portdb',
      ...phoneUser,
      "MODIFIER": "CC4F"
    });
  }

  deletePhoneUser(phoneUser: any) {
    return this.http.post('/PhoneBackend/general/manipulate/deletePhoneUserById', {
      'schema': 'portdb',
      ...phoneUser
    });
  }
}
