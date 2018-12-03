import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  evento:any;
  usuario:any;
  usuarioHeroku:any;
  imagenes:any[] = [];
  linkMapa:any;
  link = '';
  constructor( private http:HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.evento = navParams.get('evento');
    console.log(this.evento)
    this.usuario = navParams.get('usuario');
    this.usuarioHeroku = navParams.get('usuarioHeroku');
    setTimeout(() => {
      this.link = `https://infinite-dawn-60230.herokuapp.com/asistencia/${this.usuarioHeroku[0]._id}/${this.evento._id}`;
    }, 40);

    this.linkMapa = `https://maps.google.com/maps?q=${this.evento.Latitud}4%2C${this.evento.Longitud}&z=17&hl=es`
    setTimeout(() => {
      for (let i = 0; i < this.evento.Imagenes.length; i++) {
        http.get(`https://infinite-dawn-60230.herokuapp.com/files/${this.evento.Imagenes[i]}`)
        .subscribe((data:any)=>{
          this.imagenes.push('https://infinite-dawn-60230.herokuapp.com/'+data.Direccion)
        });
        
      }
    }, 1000);


    //obtener las imagenes del evento

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
  }

}
