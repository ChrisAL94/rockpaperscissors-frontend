import { Injectable } from '@angular/core';

export interface User {
  username: string,
  created_at: Date,
}

export interface UserGameHistory {
  user: User,
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


  constructor() {
  }

  getAllUsers(): Array<User> {
    return UserList;
  }

  getAllUsersGameHistory(): Array<UserGameHistory> {
    return UserList.map(user => {
      return {
        user: user,
        wins: Math.random() * 100,
        defeats: Math.random() * 100,
        ties: Math.random() * 100
      }
    })
  }

  getUserGameHistoryByUserName(username: string | undefined): UserGameHistory {
    return { user: user1, wins: 5, defeats: 4, ties: 0 }
  }

  registerUser(user: User) {
    this.loggedUser = user;
    UserList.push(user);
  }
}
