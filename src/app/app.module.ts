import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { PlayGameComponent } from './modules/game/play-game/play-game.component';
import { MatIconModule } from '@angular/material/icon';
import { UserStatisticsComponent } from './modules/statistics/user-statistics/user-statistics.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './services/userService/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    PlayGameComponent,
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'game', component: PlayGameComponent },
      { path: 'statistics', component: UserStatisticsComponent },
      { path: '**', component: NotFoundComponent }]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
