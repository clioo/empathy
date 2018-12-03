import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistorialPage } from '../historial/historial';

//providers
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { GenerarQrPage } from '../generar-qr/generar-qr';
import { ProfilePage } from '../profile/profile';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  loggeado = false;
  usuario:any = '';
  fotoUsuario:any = '';
  usuarioHeroku:any;
  link = '';
  constructor(private http:HttpClient, public navCtrl: NavController,private _usuarioProvider:UsuarioProvider,
    private afAuth:AngularFireAuth) {
      afAuth.authState.subscribe(res=>{
        if (res) {
          this.loggeado = true;  
          this.usuario = res.uid;
          this.fotoUsuario = res.photoURL;
          http.get('https://infinite-dawn-60230.herokuapp.com/logins/'+res.uid).subscribe(data=>{
            this.usuarioHeroku = data;
            this.link = 'https://infinite-dawn-60230.herokuapp.com/'+this.usuarioHeroku._id;
          })
        }
        
      })
  }

  historialAsistenciaCanjeo(){
    this.navCtrl.push(HistorialPage,{
      usuarioFirebase:this.usuario,
      usuarioHeroky:this.usuarioHeroku[0]
    })
  }

  abrirPerfil(){
    this.navCtrl.push(ProfilePage, {
      usuarioFirebase:this.usuario,
      usuarioHeroky:this.usuarioHeroku[0],
      foto:this.fotoUsuario
    })
  }
  logout(){
    this.afAuth.auth.signOut().then((res:any)=>{
      this._usuarioProvider.usuario = {};
      //this.navCtrl.push(LoginPage);
      this.afAuth.authState.subscribe(user=>{
        
      });
    })
    window.location.reload();
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
  generarQR(){
    this.navCtrl.push(GenerarQrPage,{
      usuarioHeroku:this.usuarioHeroku
    });
  }

}
