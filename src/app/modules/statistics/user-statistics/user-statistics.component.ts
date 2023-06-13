import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {GameHistoryService, UserGameHistory} from "../../../services/gameHistoryService/game-history.service";
import {UserService} from "../../../services/userService/user.service";

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  displayedColumns: string[] = ['username', 'wins', 'defeats', 'ties'];
  playerHistory: UserGameHistory | undefined;
  playerTable: Array<UserGameHistory> | undefined;
  gameHistoryService: GameHistoryService;
  userService: UserService;

  constructor(gameHistoryService: GameHistoryService, userService: UserService) {
    this.gameHistoryService = gameHistoryService
    this.userService = userService
  }

  ngOnInit() {
    this.gameHistoryService.getUserGameHistoryByUserName(this.userService.loggedUser!).then((userGameHistory) => this.playerHistory = userGameHistory);
    this.gameHistoryService.getAllUsersGameHistory().then((playerTable) => {
      this.playerTable = playerTable
      if (this.playerTable) {
        this.playerTable.sort((a, b) => b.wins - a.wins).slice(0, 9);
      }
    });
  }

}
