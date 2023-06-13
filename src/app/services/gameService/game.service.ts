import {Injectable} from '@angular/core';
import {UtilsService} from "../utils/utils.service";

export enum GameSymbol {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS"
}

export enum GameResult {
  Win = "WIN",
  Defeat = "DEFEAT",
  Tie = "TIE"
}

export interface GameResultDto {
  result: GameResult,
  computerSymbol: GameSymbol
}

export interface GameDto {
  username: string,
  userSymbol: GameSymbol,
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  loading = false;
  utils: UtilsService;

  constructor(utils: UtilsService) {
    this.utils = utils;
  }

  async play(gameDto: GameDto) {
    let formdata = new FormData();
    formdata.append("username", gameDto.username);
    formdata.append("userSymbol", gameDto.userSymbol);
    this.loading = true;
    return await this.utils.fetchData<GameResultDto>('/game', {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }).finally(() => {
      this.loading = false;
    })
  }
}
