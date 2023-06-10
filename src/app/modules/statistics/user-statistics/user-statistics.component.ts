import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent {
  displayedColumns: string[] = ['username', 'wins', 'defeats', 'ties'];
  playerHistory;
  playerTable;

  constructor(userService: UserService) {
    this.playerHistory = userService.getUserGameHistoryByUserName('user1');
    this.playerTable = userService.getAllUsersGameHistory();
  }

}
