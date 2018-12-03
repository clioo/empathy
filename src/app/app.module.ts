import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgxQRCodeModule, NgxQRCodeComponent } from 'ngx-qrcode2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from '../pipes/imagen/imagen';
import { HistorialPage } from '../pages/historial/historial';

//plugins
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//paginas
import { NotificationsPage  } from '../pages/notifications/notifications';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import { GenerarQrPage } from '../pages/generar-qr/generar-qr';
import { PublicarEventoPage } from '../pages/publicar-evento/publicar-evento';
import { EventoPage } from '../pages/evento/evento';
import { ProfilePage } from '../pages/profile/profile';



//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from 'angularfire2/auth';


//permisos nativos
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//providers
import { UsuarioProvider } from '../providers/usuario/usuario';



//configuracion de firebase
export const firebaseConfig = {
    apiKey: "AIzaSyB1yoz3eHjmhqKDll5ERIYofYrhdGiRZJU",
    authDomain: "empapthy-firebase.firebaseapp.com",
    databaseURL: "https://empapthy-firebase.firebaseio.com",
    projectId: "empapthy-firebase",
    storageBucket: "empapthy-firebase.appspot.com",
    messagingSenderId: "226772164225"
};
@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    GenerarQrPage,
    ContactPage,
    HomePage,
    HistorialPage,
    TabsPage,
    LoginPage,
    PublicarEventoPage,
    EventoPage,
    ProfilePage,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    GenerarQrPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    HistorialPage,
    PublicarEventoPage,
    EventoPage,
    ProfilePage,
    NgxQRCodeComponent
    
  ],
  providers: [
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Camera,
    UsuarioProvider, 
    Facebook,
    Geolocation,
    FileTransfer, 
    FileTransferObject
  ]
})
export class AppModule {}
