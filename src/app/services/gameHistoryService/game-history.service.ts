import { Injectable } from '@angular/core';

export interface UserGameHistory {
  user: string,
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
    return new Promise<Array<UserGameHistory>>(async (resolve, reject) => {
      this.loading = true;
      try {
        let response = await fetch("http://localhost:8080/api/v1/gameHistory");
        if (response.ok) {
          this.loading = false;
          response.json().then(resolve).catch(resolve);
        } else {
          this.loading = false;
          reject(JSON.parse(await response.text()).message)
        }
      } catch (err) {
        this.loading = false;
        reject(err)
      }
    });
  }

  async getUserGameHistoryByUserName(username: string | null): Promise<UserGameHistory> {
    return new Promise<UserGameHistory>(async (resolve, reject) => {
      this.loading = true;
      try {
        let response = await fetch(`http://localhost:8080/api/v1/gameHistory/${username}`);
        if (response.ok) {
          this.loading = false;
          response.json().then(resolve).catch(resolve);
        } else {
          this.loading = false;
          reject(JSON.parse(await response.text()).message)
        }
      } catch (err) {
        this.loading = false;
        reject(err)
      }
    });
    // let allUserGameHistory = await this.getAllUsersGameHistory();
    // return allUserGameHistory.find(userGameHistory => userGameHistory.user == username) as UserGameHistory
  }
}
