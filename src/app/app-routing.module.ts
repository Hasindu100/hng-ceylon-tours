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
      { path: 'about', component: AboutUsComponent},
      { path: 'contact', component: ContactUsComponent},
      { path: 'faq', component: FaqComponent},
      { path: 'terms', component: TermsConditionsComponent},
      { path: 'things-todo', component: ThingsTodoMainComponent },
      { path: 'things-todo/single', component: ThingsTodoSingleComponent },
      { path: 'things-todo/single2', component: ThingsTodoSingle2Component },
      { path: 'packages', component: PackagesComponent },
      { path: 'tours', component: ToursMainComponent },
      { path: 'tours/single', component: ToursSingleComponent },
      { path: 'booking-details', component: BookingDetailsFormComponent },
      { path: 'booking-history', 
        component: BookingHistoryComponent,
        canActivate: [AuthGuard],
        data: {
          authGuardPipe: redirectToLogin
        },
        resolve: {
          user: UserResolver
        }
      },
      { path: 'test', component: TestPageComponent },
      { 
        path: 'checkout/:bookingId', 
        component: CheckoutComponent,
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
    component: PaymentSuccessComponent,
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
