import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerarQrPage } from './generar-qr';

@NgModule({
  declarations: [
    GenerarQrPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerarQrPage),
  ],
})
export class GenerarQrPageModule {}
