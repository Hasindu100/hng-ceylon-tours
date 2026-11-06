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
import { BookingDetailsFormComponent } from './pages/booking-details-form/booking-details-form.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserResolver } from './services/user.resolver';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';

const redirectToLogin = () => redirectUnauthorizedTo('');

const routes: Routes = [
  { path: '',
    component: BodyComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about',
        loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent)
      },
      { path: 'contact',
        loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
      },
      { path: 'faq',
        loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent)
      },
      { path: 'terms',
        loadComponent: () => import('./pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent)
      },
      { path: 'things-todo',
        loadComponent: () => import('./pages/thingsToDo/things-todo-main/things-todo-main.component').then(m => m.ThingsTodoMainComponent)
       },
      { path: 'things-todo/single',
        loadComponent: () => import('./pages/thingsToDo/things-todo-single/things-todo-single.component').then(m => m.ThingsTodoSingleComponent)
       },
      { path: 'things-todo/single2',
        loadComponent: () => import('./pages/thingsToDo/things-todo-single2/things-todo-single2.component').then(m => m.ThingsTodoSingle2Component)
       },
      { path: 'packages',
        loadComponent: () => import('./pages/packages/packages.component').then(m => m.PackagesComponent)
       },
      // { path: 'tours',
      //   loadComponent: () => import('./pages/tours/tours-main/tours-main.component').then(m => m.ToursMainComponent)
      //  },
      { path: 'tours/single',
        loadComponent: () => import('./pages/tours/tours-single/tours-single.component').then(m => m.ToursSingleComponent)
       },
      { path: 'booking-details',
        loadComponent: () => import('./pages/booking-details-form/booking-details-form.component').then(m => m.BookingDetailsFormComponent)
       },
      { path: 'booking-history', 
        loadComponent: () => import('./pages/booking-history/booking-history.component').then(m => m.BookingHistoryComponent),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectToLogin
        },
        resolve: {
          user: UserResolver
        }
      },
      { path: 'test',
        loadComponent: () => import('./pages/test-page/test-page.component').then(m => m.TestPageComponent)
       },
      { 
        path: 'checkout/:bookingId', 
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectToLogin
        },
        resolve: {
          user: UserResolver
        }
      },
    ]
  },
  { 
    path: 'payment-success', 
    loadComponent: () => import('./pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectToLogin
    },
    resolve: {
      user: UserResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
