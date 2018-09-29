import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
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
  CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.classList.add('btn');
    controlUI.classList.add('btn-primary');
    controlUI.classList.add('btn-lg');
    controlUI.style.opacity = '0.7';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
      var controlText = document.createElement('div');
    controlText.classList.add('fa');
    controlText.classList.add('fa-plus-circle');
    controlText.classList.add('fa-4x');
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
    const location = new google.maps.LatLng(51,30);
     //opciones de mapaa
     const options = {
      center:location,
      zoom:11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl:false,
      zoomControl:false,
      mapTypeControl:false,
      fullscreenControl:false,
     }

     this.map = new google.maps.Map(this.mapRef.nativeElement, options);

     var centerControlDiv = document.createElement('div');
     console.log(centerControlDiv)
     this.CenterControl(centerControlDiv, this.map);
     this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv );
  }
  constructor(public navCtrl: NavController,private camera: Camera) {
  }
  



}
