import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { FormControl, Validators,  ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User, UserService } from '../../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, NgIf, ReactiveFormsModule, RouterLink],
})
export class RegisterComponent {
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]);
  registeredUser: User | undefined;
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  registerBtnClick(): void {
    this.registeredUser = {username: this.usernameFormControl.value || '', created_at: new Date()}
    this.userService.registerUser(this.registeredUser);
  }

  getErrorMessage(): string {
    if (this.usernameFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.usernameFormControl.errors ? 'Not a valid username' : '';
  }
}
