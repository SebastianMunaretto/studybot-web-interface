import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { DigitalRegsiterComponent } from './components/digital-regsiter/digital-regsiter.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { DeleteTasksDialogComponent } from './components/delete-tasks-dialog/delete-tasks-dialog.component';
import { StudyTimerComponent } from './components/study-timer/study-timer.component';
import { MarkChartComponent } from './components/mark-chart/mark-chart.component';
import { DiscordAuthService } from './services/discord-auth.service';
import { NgChartsModule } from 'ng2-charts';

// Angular Material Components
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToDoComponent,
    DigitalRegsiterComponent,
    LoginComponent,
    NavBarComponent,
    CreateTaskDialogComponent,
    DeleteTasksDialogComponent,
    StudyTimerComponent,
    MarkChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    NgChartsModule
  ],
  providers: [DiscordAuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
