import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//provider
import { UsuarioProvider } from '../../providers/usuario/usuario';
//nativos
import { Facebook } from '@ionic-native/facebook';

//firebaseimport { platform } from 'os';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    loggeado = false;
    constructor(public navCtrl: NavController, 
    public _usuarioProvider:UsuarioProvider, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private fb:Facebook,
    private platform:Platform) {
    this.user = this.afAuth.authState;
  }
  user: Observable<firebase.User>;

 
  
  signOut() {
    this.afAuth.auth.signOut();
  }
  ionViewDidLoad() {
    
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then((res:any)=>{
          this._usuarioProvider.cargarUusuario(
            res.displayName,
            res.email,
            res.photoURL,
            res.uid,
            'facebook'
          )
          this._usuarioProvider.loggeado = true;
          this.navCtrl.pop();
        }).catch(res => console.log(res));
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res:any) => {
          this._usuarioProvider.cargarUusuario(
            res.user.displayName,
            res.user.email,
            res.user.photoURL,
            res.user.uid,
            'facebook'
          )
          this.navCtrl.pop();
        }).catch(error => console.log(error));
    }

  }
}
