import { Component } from '@angular/core';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent {
  displayedColumns: string[] = ['username', 'wins', 'defeats', 'ties'];
  player = { userName: "testUser1", wins: 5, defeats: 4, tie: 0 };
  playerTable = [
    {userName: "testUser1", wins: 5, defeats: 4, tie: 0}, {userName: "testUser2", wins: 6, defeats: 2, tie: 3}, {userName: "testUser3", wins: 7, defeats: 3, tie: 1}]
}
