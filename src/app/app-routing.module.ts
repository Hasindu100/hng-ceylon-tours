import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BodyComponent } from './body/body.component';
import { ThingsTodoMainComponent } from './pages/thingsToDo/things-todo-main/things-todo-main.component';
import { HomeComponent } from './pages/home/home.component';
import { ThingsTodoSingleComponent } from './pages/thingsToDo/things-todo-single/things-todo-single.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ToursSingleComponent } from './pages/tours/tours-single/tours-single.component';
import { ToursMainComponent } from './pages/tours/tours-main/tours-main.component';
import { ThingsTodoSingle2Component } from './pages/thingsToDo/things-todo-single2/things-todo-single2.component';

const routes: Routes = [
  { path: '',
    component: BodyComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutUsComponent},
      { path: 'contact', component: ContactUsComponent},
      { path: 'things-todo', component: ThingsTodoMainComponent },
      { path: 'things-todo/single', component: ThingsTodoSingleComponent },
      { path: 'things-todo/single2', component: ThingsTodoSingle2Component },
      { path: 'packages', component: PackagesComponent },
      { path: 'tours', component: ToursMainComponent },
      { path: 'tours/single', component: ToursSingleComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
