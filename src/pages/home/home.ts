import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { AngularFireAuth } from '@angular/fire/auth';
declare var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map')mapRef:ElementRef;
  @ViewChild('boton')botonRef:ElementRef;
  image: string = null;
  map: any;
  //esta variable verifica si el usuario está loggeado
  loggeado = false;
  constructor(public navCtrl: NavController,
    private camera: Camera, afAuth:AngularFireAuth) {
      afAuth.authState.subscribe(res=>{

        if (res) {
          console.log(res);
          this.loggeado = true;
        }
      })
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
      this.image = `data:image/jpeg;base64,${imageData}`;
      console.log('hola chicho puto');
    })
    .catch(error =>{
      console.error( error );
    });
    
  }
  ionViewDidLoad(){
   this.showMap();
  }
  //boton en el mapa para publicar evento
  eventControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.classList.add('btn');
    controlUI.classList.add('btn-primary');
    controlUI.classList.add('btn-lg');
    controlUI.style.opacity = '0.7';
    controlUI.classList.add('mapButton');
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
      var controlText = document.createElement('div');
    controlText.classList.add('fa');
    controlText.classList.add('fa-plus-circle');
    controlText.classList.add('fa-3x');
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () =>{
      let options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        quality: 100
      }
      this.camera.getPicture( options )
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
        console.log('hola chicho puto');
      })
      .catch(error =>{
        console.error( error );
      });
    })


  }
  showMap(){
    const location = new google.maps.LatLng(25.7667,-108.9667);
     //opciones de mapaa
     const options = {
      center:location,
      zoom:12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl:false,
      zoomControl:false,
      mapTypeControl:false,
      fullscreenControl:false,
     }

     this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     //crea el boton para publicar evento
     var centerControlDiv = document.createElement('div');
     this.eventControl(centerControlDiv, this.map);
     //INCRUSTA LOS BOTONES ENCIMA DEL MAPA
     this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  }

  openLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
