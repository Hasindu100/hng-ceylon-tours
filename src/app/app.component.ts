import { afterNextRender, Component, inject } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'hng-ceylon-tours';
  readonly loaderService = inject(LoaderService);
  constructor() {
    
    afterNextRender(() => {
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.4s ease';

        setTimeout(() => splash.remove(), 400);
      }
    });
  }
}
