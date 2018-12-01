import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailAndPasswordPage } from './email-and-password';

@NgModule({
  declarations: [
    EmailAndPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailAndPasswordPage),
  ],
})
export class EmailAndPasswordPageModule {}
