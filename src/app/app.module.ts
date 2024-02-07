import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { BotComponent } from './components/bot/bot.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { PyScriptDirective } from './directives/py-script.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    EstadisticasComponent,
    AlumnosComponent,
    BotComponent,
    RedirectComponent,
    LoginComponentComponent,
    PyScriptDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
