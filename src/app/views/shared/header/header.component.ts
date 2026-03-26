import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  sair() {
    this.authService.sair();
    this.router.navigate(['/login']);
  }
}
