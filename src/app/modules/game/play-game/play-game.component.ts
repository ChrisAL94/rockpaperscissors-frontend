import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {UserService} from '../../../services/userService/user.service';
import {GameDto, GameResult, GameResultDto, GameService, GameSymbol} from '../../../services/gameService/game.service';
import {OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, NgForOf, RouterLink, MatIconModule, MatButtonToggleModule, NgIf, MatProgressSpinnerModule],
})
export class PlayGameComponent implements OnInit {
  playGame = true;
  gameResult: GameResult | undefined;
  computerChoice: GameSymbol | undefined;
  playerChoice: GameSymbol | undefined;
  userService: UserService;
  gameService: GameService;

  constructor(userService: UserService, gameService: GameService) {
    this.userService = userService;
    this.gameService = gameService;
  }

  ngOnInit() {
    this.playerChoice = undefined;
  }

  resetGame() {
    this.playGame = true;
    this.gameResult = undefined;
    this.computerChoice = undefined;
    this.playerChoice =  undefined
  }

  async play() {
    this.playGame = false;
    let gameDto: GameDto = {username: this.userService.loggedUser!, userSymbol: this.playerChoice!}
    this.gameService.play(gameDto).then(gameResult => {
      this.gameResult = gameResult.result;
      this.computerChoice = gameResult.computerSymbol
    }).catch(err => alert(err));
  }

}
