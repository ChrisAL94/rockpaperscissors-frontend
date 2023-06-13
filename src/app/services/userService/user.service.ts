import {Injectable} from '@angular/core';
import {LOGIN_COOKIE_NAME, UtilsService} from '../utils/utils.service';

export interface UserGameHistory {
  username: string,
  wins: number
  defeats: number,
  ties: number,
}

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
    return new Promise<Array<string>>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(UserList);
        reject('No Connection to Backend')
        this.loading = false;
      }, 2000)
    })
  }

  async getAllUsersGameHistory(): Promise<Array<UserGameHistory>> {
    return new Promise<Array<UserGameHistory>>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(UserList.map(user => {
          return {
            username: user,
            wins: Math.floor(Math.random() * 100),
            defeats: Math.floor(Math.random() * 100),
            ties: Math.floor(Math.random() * 100)
          }
        }));
        reject('No Connection to Backend')
        this.loading = false;
      }, 2000)
    })
  }

  async getUserGameHistoryByUserName(username: string | null): Promise<UserGameHistory> {
    let allUserGameHistory = await this.getAllUsersGameHistory();
    return allUserGameHistory.find(userGameHistory => userGameHistory.username == username) as UserGameHistory
  }

  async registerUser(newUser: string): Promise<String> {
    return new Promise<String>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        this.loggedUser = newUser;
        if (UserList.find(existingUser => existingUser == newUser)) {
          reject("Username already exists. Please choose a unique username")
        } else {
          UserList.push(newUser);
          resolve(newUser);
        }
        this.loading = false;
      }, 2000)
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
