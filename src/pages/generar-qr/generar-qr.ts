import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GenerarQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generar-qr',
  templateUrl: 'generar-qr.html',
})
export class GenerarQrPage {
  ngxQrcode2 = 'https://www.npmjs.com/package/ngx-qrcode2';
  techiediaries = 'https://www.npmjs.com/~techiediaries';
  letsboot = 'https://www.letsboot.com/';
  link;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let usuarioHeroku = navParams.get('usuarioHeroku')
    console.log(usuarioHeroku)
    this.link = 'https://infinite-dawn-60230.herokuapp.com/GastarPuntos/'+usuarioHeroku[0]._id + '/5/'+'Gasto de puntos';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarQrPage');
  }

}
