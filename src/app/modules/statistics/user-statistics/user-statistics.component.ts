import { Component } from '@angular/core';
import { UserGameHistory, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent {
  displayedColumns: string[] = ['username', 'wins', 'defeats', 'ties'];
  playerHistory: UserGameHistory;
  playerTable: Array<UserGameHistory>;

  constructor(userService: UserService) {
    this.playerHistory = userService.getUserGameHistoryByUserName(userService.loggedUser?.username);
    this.playerTable = userService.getAllUsersGameHistory();
  }

}
