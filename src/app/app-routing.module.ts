import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RedirectComponent } from './components/redirect/redirect.component'; 
import { EstadisticasAlumnoComponent } from './components/estadisticas-alumno/estadisticas-alumno.component';
import { RegisterComponent } from './components/register/register.component';
import { EstadisticasProfesorComponent } from './components/estadisticas-profesor/estadisticas-profesor.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estadisticas-alumno', component: EstadisticasAlumnoComponent },
  { path: 'estadisticas-profesor', component: EstadisticasProfesorComponent },
  { path: 'clase', component: ListaAlumnosComponent},
  { path: '**', component: RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
