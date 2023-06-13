import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../services/userService/user.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, NgForOf, RouterLink, NgIf, MatProgressSpinnerModule],
})
export class LoginComponent {
  themeColor = new FormControl('primary' as ThemePalette);
  usersList: Array<string> | undefined;
  userService: UserService;
  loggedUser: string | undefined;

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.getAllUsers().then((userList) => {
      this.usersList = userList
    });
  }

  loginBtnClicked() {
    if (this.loggedUser != undefined) {
      this.userService.login(this.loggedUser);
    }
  }

}
