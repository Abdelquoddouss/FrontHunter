import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: string[] = [];

  getUsers() : string[] {
    return this.users;
  }

  addUser(username: string, password: string, email: string): void{
    this.users.push(username, password, email);
  }

}
