import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuListComponent } from './menu-list/menu-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, menuListComponent],
})
export class AppComponent {
  isLogin = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLogin = this.router.url === '';
    });
  }
}
