import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:bookingId',
    renderMode: RenderMode.Client
  },
  {
    path: 'booking-history',
    renderMode: RenderMode.Client
  },
  {
    path: 'payment-success',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
