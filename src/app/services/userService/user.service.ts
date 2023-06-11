import { Injectable } from '@angular/core';
import { LOGIN_COOKIE_NAME, UtilsService } from '../utils/utils.service';

export interface User {
  username: string,
  created_at: Date,
}

export interface UserGameHistory {
  user: User | undefined,
  wins: number
  defeats: number,
  ties: number,
}

const user1 = { username: 'testUser1', created_at: new Date(2023, 5, 21) }
const user2 = { username: 'testUser2', created_at: new Date(2023, 4, 21) }
const user3 = { username: 'testUser3', created_at: new Date(2023, 2, 21) }

let UserList: Array<User> = [user1, user2, user3];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User | undefined;
  loading = false;


  constructor(utils: UtilsService) {
    let loginCookieValue = utils.readCookieByName(LOGIN_COOKIE_NAME);
    this.loggedUser = loginCookieValue ? JSON.parse(loginCookieValue) as User : undefined;
  }

  async getAllUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(UserList);
        reject('No Connection to Backend')
        this.loading = false;
      }, 3000)
    })
  }

  async getAllUsersGameHistory(): Promise<Array<UserGameHistory>> {
    return new Promise<Array<UserGameHistory>>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(UserList.map(user => {
          return {
            user: user,
            wins: Math.floor(Math.random() * 100),
            defeats: Math.floor(Math.random() * 100),
            ties: Math.floor(Math.random() * 100)
          }
        }));
        reject('No Connection to Backend')
      }, 3000)
      this.loading = false;
    })
  }

  async getUserGameHistoryByUserName(username: string | undefined): Promise<UserGameHistory> {
    let allUserGameHistory = await this.getAllUsersGameHistory();
    return allUserGameHistory.find(userGameHistory => userGameHistory.user?.username == username) as UserGameHistory
  }

  async registerUser(newUser: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        this.loggedUser = newUser;
        if (UserList.find(existingUser => existingUser.username == newUser.username)) {
          reject("Username already exists. Please choose a unique username")
        } else {
          UserList.push(newUser);
          resolve();
        }
      }, 3000)
      this.loading = false;
    })
  }

  login(user: User): void {
    this.loggedUser = user;
    document.cookie = `loggedUser=${JSON.stringify(user)}`;
  }

  logout(): void {
    this.loggedUser = undefined
    document.cookie = `loggedUser=; 01 Jan 1970 00:00:00 UTC`
  }
}
