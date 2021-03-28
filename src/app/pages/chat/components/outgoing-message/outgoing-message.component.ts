import { Component, Input } from '@angular/core';
import { Message } from '@models/message.model';

@Component({
  selector: 'app-outgoing-message',
  templateUrl: './outgoing-message.component.html',
  styleUrls: ['./outgoing-message.component.scss'],
})
export class OutgoingMessageComponent {
  @Input() public message: Message;
}
