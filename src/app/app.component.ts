import { afterNextRender, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'hng-ceylon-tours';

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
