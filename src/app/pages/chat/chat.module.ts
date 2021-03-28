import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ChatComponent, IncomingMessageComponent, OutgoingMessageComponent, LoginComponent } from './index';

@NgModule({
  declarations: [ChatComponent, IncomingMessageComponent, OutgoingMessageComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [ChatComponent],
})
export class ChatModule {}
