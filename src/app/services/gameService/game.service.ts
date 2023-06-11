import { Injectable } from '@angular/core';

export enum GameSymbols {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors"
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
}
