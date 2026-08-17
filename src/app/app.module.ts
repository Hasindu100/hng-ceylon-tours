import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { HeroComponent } from './layouts/hero/hero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSliderComponent } from './layouts/header-slider/header-slider.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CustomerReviewsComponent } from './sections/customer-reviews/customer-reviews.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './sections/about/about.component';
import { ClientTestimonialsComponent } from './sections/client-testimonials/client-testimonials.component';
import { ThingsToDoComponent } from './sections/things-to-do/things-to-do.component';
import { FeaturesComponent } from './sections/features/features.component';
import { BodyComponent } from './body/body.component';
import { ThingsTodoMainComponent } from './pages/thingsToDo/things-todo-main/things-todo-main.component';
import { HomeComponent } from './pages/home/home.component';
import { ThingsTodoSingleComponent } from './pages/thingsToDo/things-todo-single/things-todo-single.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HeroBannerComponent } from './shared/hero-banner/hero-banner.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { ToursSingleComponent } from './pages/tours/tours-single/tours-single.component';
import { environment } from 'src/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ToursMainComponent } from './pages/tours/tours-main/tours-main.component';
import { ThingsTodoSingle2Component } from './pages/thingsToDo/things-todo-single2/things-todo-single2.component';
import { ImageSliderComponent } from './shared/image-slider/image-slider.component';
import { MapDisplayComponent } from './shared/map-display/map-display.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TruncatePipe } from './shared/custom-pipes/truncate.pipe';
import { HomeHeroComponent } from './layouts/home-hero/home-hero.component';
import { Header2Component } from './layouts/header2/header2.component';
import { CommonModule } from '@angular/common';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TourHeroComponent } from './layouts/tour-hero/tour-hero.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { BookingDetailsFormComponent } from './pages/booking-details-form/booking-details-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { OrderSummaryComponent } from './sections/order-summary/order-summary.component';
import { TourHero2Component } from './layouts/tour-hero2/tour-hero2.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BookingHistoryComponent } from './pages/booking-history/booking-history.component';
import { BookingStepsComponent } from './sections/booking-steps/booking-steps.component';
import { RideFeaturesComponent } from './sections/ride-features/ride-features.component';
import { BookingHistoryTempComponent } from './pages/booking-history-temp/booking-history-temp.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { AirportPickupFormComponent } from './sections/tour-hero/airport-pickup-form/airport-pickup-form.component';
import { AirportDropFormComponent } from './sections/tour-hero/airport-drop-form/airport-drop-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTourFormComponent } from './sections/tour-hero/custom-tour-form/custom-tour-form.component';
import { VehicleImagePopupComponent } from './shared/components/vehicle-image-popup/vehicle-image-popup.component';
import { RoadMapPopupComponent } from './shared/components/road-map-popup/road-map-popup.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PackagesComponent,
    HeroComponent,
    HeaderSliderComponent,
    AboutUsComponent,
    CustomerReviewsComponent,
    FooterComponent,
    AboutComponent,
    ClientTestimonialsComponent,
    ThingsToDoComponent,
    FeaturesComponent,
    BodyComponent,
    ThingsTodoMainComponent,
    HomeComponent,
    ThingsTodoSingleComponent,
    ContactUsComponent,
    HeroBannerComponent,
    GalleryComponent,
    ToursSingleComponent,
    ToursMainComponent,
    ThingsTodoSingle2Component,
    ImageSliderComponent,
    MapDisplayComponent,
    TruncatePipe,
    HomeHeroComponent,
    Header2Component,
    TourDetailsComponent,
    TourHeroComponent,
    LoaderComponent,
    BookingDetailsFormComponent,
    TestPageComponent,
    OrderSummaryComponent,
    TourHero2Component,
    CheckoutComponent,
    BookingHistoryComponent,
    BookingStepsComponent,
    RideFeaturesComponent,
    BookingHistoryTempComponent,
    PaymentSuccessComponent,
    AirportPickupFormComponent,
    AirportDropFormComponent,
    CustomTourFormComponent,
    VehicleImagePopupComponent,
    RoadMapPopupComponent,
    FaqComponent,
    TermsConditionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    CommonModule,
    NgSelectModule,
    HttpClientModule,
    CdkMenuModule,
    NgxIntlTelInputModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
