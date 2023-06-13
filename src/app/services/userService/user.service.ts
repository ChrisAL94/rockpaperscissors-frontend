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


  constructor(utils: UtilsService) {
    let loginCookieValue = utils.readCookieByName(LOGIN_COOKIE_NAME);
    this.loggedUser = loginCookieValue ? JSON.parse(loginCookieValue) as string : undefined;
  }

  async getAllUsers(): Promise<Array<string>> {
    return new Promise<Array<string>>(async (resolve, reject) => {
      this.loading = true;
      try {
        let response = await fetch("http://localhost:8080/api/v1/user");
        if (response.ok) {
          this.loading = false;
          response.json().then(users => {
            resolve(users)
          })
        } else {
          this.loading = false;
          reject("fetching all users has been executed with status " + response.status)
        }
      } catch (err) {
        this.loading = false;
        reject(err)
      }
    })
  }

  async registerUser(newUser: string): Promise<String> {
    return new Promise<String>(async (resolve, reject) => {
      this.loading = true;
      try {
        let response = await fetch("http://localhost:8080/api/v1/user", {
          method: "POST",
          body: newUser
        });
        if (response.ok) {
          this.login(newUser);
          this.loading = false;
          resolve(newUser)
        } else {
          this.loading = false;
          reject(JSON.parse(await response.text()).message)
        }
      } catch (err) {
        this.loading = false;
        reject(err)
      }
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
