import {Injectable} from '@angular/core';
import {UtilsService} from "../utils/utils.service";

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
  path = "/gameHistory"
  utils: UtilsService;

  constructor(utils: UtilsService) {
    this.utils = utils;
  }

  async getAllUsersGameHistory(): Promise<Array<UserGameHistory>> {
    this.loading = true;
    return await this.utils.fetchData<Array<UserGameHistory>>(this.path).finally(() => {
      this.loading = false;
    })
  }

  async getUserGameHistoryByUserName(username: string | null): Promise<UserGameHistory> {
    this.loading = true;
    return await this.utils.fetchData<UserGameHistory>(`${this.path}/${username}`).finally(() => {
      this.loading = false
    })
  }
}
