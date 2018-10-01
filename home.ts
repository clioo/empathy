import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imagen1="https://conceptodefinicion.de/wp-content/uploads/2016/12/Evento.jpg";
  imagen1Text="AGREGAR IMAGEN";
  imagen2=null;
  imagen2Text="AGREGAR IMAGEN";
  imagen3=null;
  imagen3Text="AGREGAR IMAGEN";
  constructor(
    private camera: Camera,
    private alertCtrl: AlertController
  ) {}
  
  Confirmacion(imagen){
    let existenciaImagen:boolean=false;
    if (imagen==1) {
     
      if (this.imagen1==null) {
        
      }else{
        existenciaImagen=true;
      }
    }else if (imagen==2) {
      if (this.imagen2==null) {
        
      }else{
        existenciaImagen=true;
      }
    }else{
      if (this.imagen3==null) {
        
      }else{
        existenciaImagen=true;
      }
    }
    if (existenciaImagen==true) {
      let alert = this.alertCtrl.create({
        title: 'Seleccione una opción',
        message: '¿Que desea hacer?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },{
            text: 'Borrar Foto',
            handler: () => {
              console.log('foto clicked');
              if (imagen==1) {
                this.imagen1=null;
              }else if (imagen==2) {
                this.imagen2=null;
              }else{
                this.imagen3=null;
              }
            }
          }
        ]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Seleccione una opción',
        message: '¿Que desea hacer?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },{
            text: 'Tomar Foto',
            handler: () => {
              console.log('foto clicked');
              this.getPicture(imagen);
            }
          }
        ]
      });
      alert.present();
    }
    
    
  }
  
  getPicture(imagen){
    
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       if (imagen==1) {
        this.imagen1 = 'data:image/jpeg;base64,' + imageData;
        this.imagen1Text="";
       }else if (imagen==2) {
        this.imagen2 = 'data:image/jpeg;base64,' + imageData;
        this.imagen2Text="";
       }else{
        this.imagen3 = 'data:image/jpeg;base64,' + imageData;
        this.imagen3Text="";
       }
       
      }, (err) => {
       // Handle error
      });
    
      
    }
  }

  


