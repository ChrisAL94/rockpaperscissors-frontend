import { Component } from '@angular/core';
import { UserGameHistory, UserService } from '../../../services/userService/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  displayedColumns: string[] = ['username', 'wins', 'defeats', 'ties'];
  playerHistory: UserGameHistory | undefined;
  playerTable: Array<UserGameHistory> | undefined;
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService
  }

  ngOnInit() {
    this.userService.getUserGameHistoryByUserName(this.userService.loggedUser!).then((userGameHistory) => this.playerHistory = userGameHistory);
    this.userService.getAllUsersGameHistory().then((playerTable) => this.playerTable = playerTable);

    if (this.playerTable) {
      this.playerTable.sort((a, b) => a.wins - b.wins).slice(0, 9);
    }
  }

}
