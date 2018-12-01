import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//providers
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  loggeado = false;
  constructor(public navCtrl: NavController,private _usuarioProvider:UsuarioProvider,
    private afAuth:AngularFireAuth) {
      afAuth.authState.subscribe(res=>{
        if (res) {
          this.loggeado = true;  
        }
        
      })
  }
  logout(){
    this.afAuth.auth.signOut().then((res:any)=>{
      this._usuarioProvider.usuario = {};
      //this.navCtrl.push(LoginPage);
      this.afAuth.authState.subscribe(user=>{
        console.log(JSON.stringify(user));
      });
    })
    window.location.reload();
  }
  login(){
    this.navCtrl.push(LoginPage);
  }

}
