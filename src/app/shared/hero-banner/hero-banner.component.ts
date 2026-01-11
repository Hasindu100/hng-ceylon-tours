import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  @Input("title") title: string = '';
  @Input("subTitle") subTitle: string = '';

}
