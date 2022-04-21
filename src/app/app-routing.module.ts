import { TokenCallback } from './components/token-callback/token-callback';
import { StudyTimerComponent } from './components/study-timer/study-timer.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { LoginComponent } from './components/login/login.component';
import { DigitalRegsiterComponent } from './components/digital-regsiter/digital-regsiter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: 'digitalregister', component: DigitalRegsiterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'todo', component: ToDoComponent},
  { path: 'studytimer', component: StudyTimerComponent},
  { path: 'callback/:mode/:token', component: TokenCallback},
  { path: '**', component: DashboardComponent}

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
