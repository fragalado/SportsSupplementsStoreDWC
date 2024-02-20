import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './vistas/acceso/login/login.component';
import { RegisterComponent } from './vistas/acceso/register/register.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './vistas/core/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    // error solution NullInjectError
    AngularFireModule.initializeApp(environment.firebase),
      BrowserAnimationsModule,
      MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
