import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//plugins
import { Facebook } from '@ionic-native/facebook';
//paginas
import { NotificationsPage  } from '../pages/notifications/notifications';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';

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
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
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
    Facebook
  ]
})
export class AppModule {}
