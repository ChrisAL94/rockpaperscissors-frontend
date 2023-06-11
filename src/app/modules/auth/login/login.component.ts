import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormsModule } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User, UserService } from '../../../services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, NgForOf, RouterLink],
})
export class LoginComponent {
  themeColor = new FormControl('primary' as ThemePalette);
  usersList: Array<User>;
  userService: UserService;
  loggedUser: User | undefined;
  constructor(userService: UserService) {
    this.userService = userService;
    this.usersList = this.userService.getAllUsers();
  }

  loginBtnClicked() {
    this.userService.login(this.loggedUser as User);
  }

}
