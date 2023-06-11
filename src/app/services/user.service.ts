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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User | undefined;


  constructor() {
  }

  getAllUsers(): Array<User> {
    return [user1, user2, user3]
  }

  getAllUsersGameHistory(): Array<UserGameHistory> {
    return [
      { user: user1, wins: 5, defeats: 4, ties: 0 },
      { user: user2, wins: 6, defeats: 2, ties: 3 },
      { user: user3, wins: 7, defeats: 3, ties: 1 }
    ];
  }

  getUserGameHistoryByUserName(username: string | undefined): UserGameHistory {
    return { user: user1, wins: 5, defeats: 4, ties: 0 }
  }
}
