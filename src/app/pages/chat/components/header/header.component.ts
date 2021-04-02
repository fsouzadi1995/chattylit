import { Component, Input } from '@angular/core';
import { User } from '@models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public readonly concurrentUsers: User[];
}
