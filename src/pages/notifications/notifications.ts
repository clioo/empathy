import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoPage } from '../evento/evento';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  //esta variable verifica si el usuario está loggeado
  loggeado = false;
  files:any;
  usuario:any = '';
  fotoUsuario:any = '';
  usuarioHeroku:any;
  eventos:any[] = [];
  constructor(private http:HttpClient, public navCtrl: NavController, afAuth:AngularFireAuth) {
    let usuario;
    http.get('https://infinite-dawn-60230.herokuapp.com/files').subscribe(data=>{
      this.files = data;
    })
    http.get('https://infinite-dawn-60230.herokuapp.com/eventos').subscribe((data:any)=>{
      this.eventos = data;
    })
    afAuth.authState.subscribe(res=>{

      if (res) {
        this.loggeado = true;
        this.usuario = res.uid;
        this.fotoUsuario = res.photoURL;
        usuario = res.uid;
        http.get('https://infinite-dawn-60230.herokuapp.com/logins/'+res.uid).subscribe(data=>{
          this.usuarioHeroku = data;
        })
      }
    })
  }
  abrirEvento(evento:any){
    this.navCtrl.push(EventoPage,{
      usuario: this.usuario,
      evento:evento,
      usuarioHeroku:this.usuarioHeroku
    })
  }

}
