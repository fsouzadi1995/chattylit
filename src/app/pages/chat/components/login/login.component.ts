import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public nameCtrl = new FormControl(null, [Validators.required, Validators.pattern(new RegExp('\\S'))]);

  constructor(private readonly dialogRef: MatDialogRef<LoginComponent>) {}

  onSubmit() {
    if (this.nameCtrl.invalid) {
      this.nameCtrl.patchValue(null);
      return;
    }

    this.dialogRef.close(this.nameCtrl.value.trim());
  }
}
