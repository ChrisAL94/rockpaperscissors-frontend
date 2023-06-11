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


  constructor(utils: UtilsService) {
    let loginCookieValue = utils.readCookieByName(LOGIN_COOKIE_NAME);
    this.loggedUser = loginCookieValue ? JSON.parse(loginCookieValue) as User : undefined;
  }

  getAllUsers(): Array<User> {
    return UserList;
  }

  getAllUsersGameHistory(): Array<UserGameHistory> {
    return UserList.map(user => {
      return {
        user: user,
        wins: Math.floor(Math.random() * 100),
        defeats: Math.floor(Math.random() * 100),
        ties: Math.floor(Math.random() * 100)
      }
    })
  }

  getUserGameHistoryByUserName(username: string | undefined): UserGameHistory {
    return this.getAllUsersGameHistory().find(userGameHistroy => userGameHistroy.user?.username == username) as UserGameHistory
  }

  registerUser(user: User): void {
    this.loggedUser = user;
    UserList.push(user);
  }

  login(user: User): void {
    this.loggedUser = user;
    document.cookie = `loggedUser=${JSON.stringify(user)}`;
  }
}
