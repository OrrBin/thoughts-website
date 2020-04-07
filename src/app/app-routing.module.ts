import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { SnapshotPageComponent } from './snapshot-page/snapshot-page.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user-page/:id', component: UserPageComponent },
    { path: 'snapshot/:userId/:id', component: SnapshotPageComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
