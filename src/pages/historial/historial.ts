import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  usuarioHeroku:any;
  puntos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {

    this.usuarioHeroku = navParams.get('usuarioHeroky');
    http.get(`https://infinite-dawn-60230.herokuapp.com/puntos/${this.usuarioHeroku._id}`).subscribe(data=>{
      this.puntos = data;
    });
    console.log(this.usuarioHeroku)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

}
