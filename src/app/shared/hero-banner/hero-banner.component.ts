import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss'],
    standalone: false
})
export class HeroBannerComponent {
  @Input("title") title: string = '';
  @Input("subTitle") subTitle: string = '';

}
