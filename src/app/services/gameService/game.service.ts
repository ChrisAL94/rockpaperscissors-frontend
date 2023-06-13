import {Injectable} from '@angular/core';

export enum GameSymbol {
  Rock = "ROCK",
  Paper = "PAPER",
  Scissors = "SCISSORS"
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

  constructor() {
  }

  async play(gameDto: GameDto) {
    console.log(JSON.stringify(gameDto));
    return new Promise<GameResultDto>(async (resolve, reject) => {
      this.loading = true;
      try {
        let response = await fetch("http://localhost:8080/api/v1/game", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameDto)
        });
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
      // this.loading = true;
      // setTimeout(() => {
      //   resolve(GameResult.Defeat);
      //   reject('No Connection to Backend')
      //   this.loading = false;
      // }, 2000)
    });
  }
}
