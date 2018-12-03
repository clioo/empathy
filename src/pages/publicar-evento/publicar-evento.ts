import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonPipe } from '@angular/common';
/**
 * Generated class for the PublicarEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicar-evento',
  templateUrl: 'publicar-evento.html',
})
export class PublicarEventoPage {
  todo={
    titulo:'',
    descripcion:'',
    horas:''
  }
  geolocalizacion = {
    latitud:0,
    longitud:0
  };
  image:any[] = [];
  cadenaImagenes:any;
  usuario:any;
  ids:any;
  idsImagenes = new Array();
  constructor(private transfer: FileTransfer, private http:HttpClient, private camera:Camera, public navCtrl: NavController, public navParams: NavParams, private geoLoc:Geolocation) {
    geoLoc.getCurrentPosition().then(data=>{
      this.geolocalizacion.latitud = data.coords.latitude;
      this.geolocalizacion.longitud = data.coords.longitude;
    });
    this.usuario = navParams.get('usuario');
    this.ids = navParams.get('usuario');
  }
  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image.push(`data:image/jpeg;base64,${imageData}`);
      console.log('hola chicho puto');
    })
    .catch(error =>{
      console.error( error );
    });
    
  }
  eliminarFoto(i){
    this.image.splice(i,1);
    this.idsImagenes.splice(i,1);
  }
  tomarFoto(){
        let image:any;
        let options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        quality: 100
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      let optionsImg: FileUploadOptions = {
        fileKey: 'upfile',
        fileName: 'name.jpg',
        headers: {}
     }
      this.camera.getPicture( options )
      .then(imageData => {
        this.image.push(`data:image/jpeg;base64,${imageData}`);
        image = `data:image/jpeg;base64,${imageData}`;
            fileTransfer.upload(image,'https://infinite-dawn-60230.herokuapp.com/upload', optionsImg).then(data=>{
            if (this.image.length == 1) {
              this.cadenaImagenes = data.response.substring(1,25)
            }else{
              this.cadenaImagenes = this.cadenaImagenes + "," + data.response.substring(1,25)
            }
            this.idsImagenes.push(data.response.substring(1,25))
            this.ids = data.response;
          }).catch(err=>this.ids = err)  
        console.log('hola chicho puto');
      })
      .catch(error =>{
        console.error( error );
      });
  }
  publicarEvento(form:any){
    this.ids = this.idsImagenes;
    console.log(form)
    if (this.image.length == this.idsImagenes.length) {
      if (form.valid) {
        this.http.post(`https://infinite-dawn-60230.herokuapp.com/eventos/`,{
          Titulo:this.todo.titulo,
          Horas:this.todo.horas,
          Usuario:'5c02e26daec5cc0016edc086',
          Descripcion:this.todo.descripcion,
          Latitud:this.geolocalizacion.latitud,
          Longitud:this.geolocalizacion.longitud,
          Imagenes:this.idsImagenes,
          DescHistPuntos:'asd',
          Estado:'A'
        }).subscribe((data:any)=>{
          window.location.reload();
          this.ids = this.cadenaImagenes;
        })
      }else{
        alert('formulario inválido')
      }

    }

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarEventoPage');
  }

}
