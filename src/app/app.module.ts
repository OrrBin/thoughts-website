import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FeelingsComponent } from './feelings/feelings.component';
import { ImageComponent } from './image/image.component';
import { PositionComponent } from './position/position.component';

import { MatCardModule } from '@angular/material/card';
import { UserPageComponent } from './user-page/user-page.component';
import { SnapshotPageComponent } from './snapshot-page/snapshot-page.component';
import { UsersComponent } from './users/users.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DatePipe } from '@angular/common';

import { EnvServiceProvider } from './core/services/env.service.provider';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UsersComponent },
  { path: 'user-page/:id', component: UserPageComponent },
  { path: 'snapshot/:userId/:id/:timestamp', component: SnapshotPageComponent } ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeelingsComponent,
    ImageComponent,
    PositionComponent,
    UserPageComponent,
    SnapshotPageComponent,
    UsersComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
  ],
  providers: [EnvServiceProvider, DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
