import { Injectable } from '@angular/core';

export enum GameSymbols {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors"
}

export enum GameResult {
  Win = "You won!",
  Defeat = "You Lost!",
  Tie = "It`s a tie!"
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  loading = false;

  constructor() { }

  async play(playerChoice: GameSymbols | undefined) {
    return new Promise<GameResult>((resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(GameResult.Defeat);
        reject('No Connection to Backend')
        this.loading = false;
      }, 2000)
    });
  }
}
