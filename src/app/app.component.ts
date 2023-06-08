import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rockpaperscissors-frontend';
  buttonClickCount = 0;
  buttonClicked() {
    this.buttonClickCount++;
    alert(`Button was clicked ${this.buttonClickCount} times`)
  }
}
