import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
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
import { LayoutModule } from '@angular/cdk/layout';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UsersComponent },
  { path: 'user-page/:id', component: UserPageComponent },
  { path: 'snapshot/:userId/:id', component: SnapshotPageComponent } ];

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
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
