import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEditUser } from 'src/app/common/interfaces/edit-user';
import { ICreateUser } from 'src/app/common/interfaces/create-user';
import { IHelpDesk } from 'src/app/common/interfaces/help-desk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public localhost: string = 'https://prize-redemption-backend.herokuapp.com/';

  constructor(private readonly http: HttpClient) { }

  public sendEmailToHelpDesk(textToSend: IHelpDesk) {
    return this.http.post(`${this.localhost}help-desk`, textToSend);
  }
  public getUserActivity(id: string) {
    return this.http.get(`${this.localhost}user/redemptionRecords/${id}`);
  }

  public createUser(user: ICreateUser) {
    return this.http.post(`${this.localhost}user/create`, user);
  }

  public updateUser(user: IEditUser, id: string) {
    return this.http.put(`${this.localhost}user/${id}`, user);
  }
  public getUserByID(id: string) {
    return this.http.get(`${this.localhost}user/${id}`);
  }
  public deleteUser(id: string) {
    return this.http.delete(`${this.localhost}user/${id}`);
  }

  public updateUserOutlet(outletToChange, userId: string) {
    return this.http.put(`${this.localhost}user/${userId}/outlet`, outletToChange);
  }

  public getAllUsers(currentPage) {
    const params = new HttpParams();
    params.append('page', currentPage);
    return this.http.get(`${this.localhost}user`, { params });
  }

  public getUserIdByUsername(username: string) {
    return this.http.get(`${this.localhost}user/username/${username}`);
  }

  public getUserIdByEmail(email: string): Observable<{}> {
    return this.http.get(`${this.localhost}user/email/${email}`);
  }

  public getOutletActivity(id: string) {
    return this.http.get(`${this.localhost}user/outlet-activity/${id}`);
  }

  public getAllEmails() {
    return this.http.get(`${this.localhost}user/all-emails`);
  }

  public getAllUsernames() {
    return this.http.get(`${this.localhost}user/all-usernames`);
  }

  public uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.localhost}user/upload`, formData);
  }

  public getFile(param) {
    return this.http.get(`${this.localhost}user/image/${param}`, { responseType: 'blob' });
  }
}