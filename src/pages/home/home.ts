import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { PublicarEventoPage } from '../publicar-evento/publicar-evento';
import { Observable } from 'rxjs/observable';
import { EventoPage } from '../evento/evento';


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
  usuario:any = '';
  usuarioHeroku:any;
  eventos:any[] = [];
  constructor(public navCtrl: NavController, private http:HttpClient,
   afAuth:AngularFireAuth) {
      let usuario;
      let usuarioHeroku;
      http.get('https://infinite-dawn-60230.herokuapp.com/eventos').subscribe((data:any)=>{
        console.log((data))
        this.eventos = data;
      })

      

      afAuth.authState.subscribe(res=>{

        if (res) {
          console.log(res);

          http.get('https://infinite-dawn-60230.herokuapp.com/logins/'+ res.uid).subscribe((data:any[])=>{
            if (data.length == 0) {
              http.post('https://infinite-dawn-60230.herokuapp.com/perfiles/',{
                FirebaseUID:res.uid,
                Nombres:res.displayName,
                Appa:'asd',
                Apma:'asd',
                CURP:'asd',
                Institucion:'5c02dfc3aec5cc0016edc084',
                CveEstudiante:'asd',
                Celular:'asd',
                HistorialPuntos:[]
              }).subscribe(data=>{
                console.log(data)
                this.usuarioHeroku =  data;
                usuarioHeroku = data;
              })  
            }else{
              this.usuarioHeroku = data;
              usuarioHeroku = data
            }
            
          })


          this.loggeado = true;
          this.usuario = res.uid;
          usuario = res.uid;
        }
      })

      setTimeout(() => {
        for (let i = 0; i < this.eventos.length; i++) {
          const evento = this.eventos[i];
          var latLng = new google.maps.LatLng(this.eventos[i].Latitud, this.eventos[i].Longitud); 
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: this.eventos[i].Titulo
            });
            google.maps.event.addListener(marker,'click',function(){
              navCtrl.push(EventoPage,{
                usuario: usuario,
                evento:evento,
                usuarioHeroku: usuarioHeroku
              })
              
            })
        }
       }, 3000);
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
      if (this.loggeado == true) {
        this.navCtrl.push(PublicarEventoPage, {
          usuario:this.usuario
        });  
      }else{
        this.navCtrl.push(LoginPage);
      }
      
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
