import { Component, Input } from '@angular/core';
import { Message } from '@models';

@Component({
  selector: 'app-outgoing-message',
  templateUrl: './outgoing-message.component.html',
  styleUrls: ['./outgoing-message.component.scss'],
})
export class OutgoingMessageComponent {
  @Input() public readonly message: Message;
}
