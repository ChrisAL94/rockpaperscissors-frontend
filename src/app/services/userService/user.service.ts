import {Injectable} from '@angular/core';
import {LOGIN_COOKIE_NAME, UtilsService} from '../utils/utils.service';

const user1 = 'testUser1'
const user2 = 'testUser2'
const user3 = 'testUser3'

let UserList: Array<string> = [user1, user2, user3];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: string | undefined;
  loading = false;
  utils: UtilsService;
  path = "/user"


  constructor(utils: UtilsService) {
    this.utils = utils;
    let loginCookieValue = this.utils.readCookieByName(LOGIN_COOKIE_NAME);
    this.loggedUser = loginCookieValue ? JSON.parse(loginCookieValue) as string : undefined;
  }

  async getAllUsers(): Promise<Array<string>> {
    this.loading = true;
    return await this.utils.fetchData<Array<string>>(this.path).finally(() => {
      this.loading = false
    });
  }

  async registerUser(newUser: string): Promise<string> {
    this.loading = true;
    return await this.utils.fetchData<string>(this.path, {method: "POST", body: newUser}).finally(() => {
      this.loggedUser = newUser;
      this.loading = false;
    })
  }

  login(user: string): void {
    this.loggedUser = user;
    document.cookie = `loggedUser=${JSON.stringify(user)}`;
  }

  logout(): void {
    this.loggedUser = undefined
    document.cookie = `loggedUser=; 01 Jan 1970 00:00:00 UTC`
  }
}
