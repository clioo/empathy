import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { database } from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  usuarioHeroku;
  idUsuarioFirebase;
  fotoUsuario;
  telefono;
  constructor(private http:HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.idUsuarioFirebase = navParams.get('usuarioFirebase');
    this.usuarioHeroku = navParams.get('usuarioHeroky');
    this.fotoUsuario = navParams.get('foto');
    console.log(this.usuarioHeroku)
    this.telefono = this.usuarioHeroku.Celular;
    if (this.telefono == 'asd') {
      this.telefono = '';
    }
  }
  cambiarNumero(){
    this.http.put('https://infinite-dawn-60230.herokuapp.com/perfiles/'+this.usuarioHeroku._id,{
      Celular:this.telefono
    }).subscribe(data=>{
      console.log(data)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
