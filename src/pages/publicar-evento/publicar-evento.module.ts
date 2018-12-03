import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicarEventoPage } from './publicar-evento';

@NgModule({
  declarations: [
    PublicarEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicarEventoPage),
  ],
})
export class PublicarEventoPageModule {}
