import { Injectable } from '@angular/core';

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
export class GameHistoryService {
  loading = false;

  constructor() { }

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
}
