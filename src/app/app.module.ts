import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleRegisterComponent } from './components/role-register/role-register.component';
import { EstadisticasAlumnoComponent } from './components/estadisticas-alumno/estadisticas-alumno.component';
import { PorffConfirmComponent } from './components/porff-confirm/porff-confirm.component';
import { EstadisticasProfesorComponent } from './components/estadisticas-profesor/estadisticas-profesor.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { StudentOptionComponent } from './components/student-option/student-option.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    AlumnosComponent,
    RedirectComponent,
    LoginComponentComponent,
    RegisterComponent,
    RoleRegisterComponent,
    EstadisticasAlumnoComponent,
    PorffConfirmComponent,
    EstadisticasProfesorComponent,
    ListaAlumnosComponent,
    StudentOptionComponent,
    DatosPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
