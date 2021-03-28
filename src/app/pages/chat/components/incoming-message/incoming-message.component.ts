import { Message } from '@models/index';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrls: ['./incoming-message.component.scss'],
})
export class IncomingMessageComponent {
  @Input() public message: Message;
}
