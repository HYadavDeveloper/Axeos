import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UIShellModule } from 'carbon-components-angular';
import { UserAuthService } from 'src/app/services/tokenAuth.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  standalone: true,
  imports: [CommonModule, UIShellModule],
})
export class menuListComponent {
  constructor(protected auth: UserAuthService, private router: Router) {}

  checkCurrentPath(path: string) {
    const baseURL = this.router.url.split('/')[1];
    return path == baseURL;
  }
}
