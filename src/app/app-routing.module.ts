import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowsComponent } from './components/shows/shows.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AddShowComponent } from './components/add-show/add-show.component';
import { EditbookingComponent } from './components/editbooking/editbooking.component';

const routes: Routes = [
  {
    path:'home',
    pathMatch:"full",
    component:HomeComponent
  },
  {
    path:'login',
    
    pathMatch:"full",
    component:LoginComponent
  },
  {
    path:'register',
    
    pathMatch:"full",
    component:RegisterComponent
  },
  {
    path:'book-tickets',
    
    pathMatch:"full",
    component:BookTicketsComponent
  }
  ,
  {
    path:'add-movie',
    pathMatch:"full",
    component:AddMovieComponent
  },
  {
    path:'add-show',
    pathMatch:"full",
    component:AddShowComponent
  },
  {
    path:'shows',
    pathMatch:"full",
    component:ShowsComponent
  },
  {
    path:'editbooking',
    pathMatch:'full',
    component:EditbookingComponent
  },
  {
    path:'**',
    pathMatch:"full",
    component:PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
