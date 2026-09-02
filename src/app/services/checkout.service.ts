import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { CheckoutItem } from '../models/BookingVM';
import { map } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly serverUrl = environment.server2Url;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private commonServie: CommonService) { }

  onProceedToPay(products: CheckoutItem[], bookingId: any) {
    this.http.post(`${this.serverUrl}checkout`, { items: products, bookingId: bookingId })
    .pipe(
      map(async(res: any) => {
        const stripe = await loadStripe(environment.stripeAPIKey);
        this.commonServie.onWindowOpen(res.url);
        // (stripe as any)?.redirectToCheckout({
        //   sessionId: res.sessionId
        // }); 
      })
    ).subscribe({
      next: (res) => {
        this.toastr.success('Payment Successful...');
        console.log('Checkout session created successfully:', res);
      },
      error: (err) => {
        this.toastr.error('Error during checkout:');
        console.error('Error during checkout:', err);
      }
    });
  }
}
