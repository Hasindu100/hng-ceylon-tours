import { Component } from '@angular/core';

@Component({
  selector: 'app-ride-features',
  templateUrl: './ride-features.component.html',
  styleUrls: ['./ride-features.component.scss']
})
export class RideFeaturesComponent {
  topFeatures = [
    {
      name: 'Flight Monitoring',
      desc: "We track your flight to ensure we're there right when you land and we'll adjust if your flight gets delayed – no waiting, no stress!",
      link: '',
      icon: `<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>car</title> <path d="M27 22h-23c-1.104 0-2-0.896-2-2v-5c0-1.104 0.896-2 2-2h1c0 0 1.479-4.5 1.916-6s0.896-2 2.001-2h13.166c1.104 0 1.438 0.312 2 2s1.917 6 1.917 6h1c1.104 0 2 0.896 2 2v5c0 1.104-0.896 2-2 2zM9 20h13v-1h-13v1zM22 13c0-1.104-0.896-2.125-2-2.125s-2 1.021-2 2.125c0 0.026 4 0.026 4 0zM9 18h13v-1h-13v1zM9 16h13v-1h-13v1zM4.062 17c0 1.104 0.896 2 2 2s2-0.896 2-2-0.896-2-2-2-2 0.896-2 2zM23.083 7c-0.25-0.688-0.447-1-1-1h-6.083v1h0.5c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-2c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h0.5v-1h-6.083c-0.553 0-0.751 0.125-1 1-0.251 0.875-1.917 6-1.917 6h11.46c0.023-1.364 1.13-2.643 2.495-2.643s2.472 1.278 2.496 2.643h2.549c0 0-1.667-5.312-1.917-6zM24.938 15.062c-1.104 0-2 0.896-2 2s0.896 2 2 2 2-0.896 2-2-0.896-2-2-2zM7 25.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-2.5h3v2.5zM27 25.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-2.5h3v2.5z"></path> </g></svg>`
    },
    {
      name: '24/7/365 Support',
      desc: "Need help? We've got you covered around the clock, every day of the year, through any channel you prefer.",
      link: '',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <path d="M20 22c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#2d3748" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M14 34c0-4 2-7 6-8v-4h4v4" stroke="#2d3748" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="12" y="30" width="8" height="12" rx="3" stroke="#2d3748" stroke-width="2" fill="none"/>
        <path d="M46 34c0-4-2-7-6-8v-4h-4v4" stroke="#2d3748" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="40" y="30" width="8" height="12" rx="3" stroke="#2d3748" stroke-width="2" fill="none"/>
        <circle cx="36" cy="43" r="3" fill="#e6b800" stroke="#e6b800"/>
        <path d="M36 46v4" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Trained Drivers',
      desc: "Our friendly, professional drivers are not just experts behind the wheel, they've gone through a thorough vetting and selection process to ensure the safety of our riders",
      link: 'Read More',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="27" stroke="#2d3748" stroke-width="2"/>
        <circle cx="30" cy="30" r="10" stroke="#2d3748" stroke-width="2" fill="none"/>
        <circle cx="30" cy="30" r="3" fill="#2d3748"/>
        <line x1="30" y1="19" x2="30" y2="17" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="43" x2="30" y2="41" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
        <line x1="19" y1="30" x2="17" y2="30" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
        <line x1="43" y1="30" x2="41" y2="30" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="27" x2="26" y2="30" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: '35 Years Excellence',
      desc: "With over 35 years of experience, you're in trusted hands with every ride.",
      link: '',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <polygon points="30,10 35,24 50,24 38,33 43,47 30,38 17,47 22,33 10,24 25,24" stroke="#2d3748" stroke-width="2" fill="none" stroke-linejoin="round"/>
        <line x1="8" y1="8" x2="12" y2="12" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
        <line x1="52" y1="8" x2="48" y2="12" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="4" x2="30" y2="8" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
        <line x1="4" y1="30" x2="8" y2="30" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
        <line x1="56" y1="30" x2="52" y2="30" stroke="#e6b800" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    }
  ];
 
  bottomFeatures = [
    {
      name: 'Free Cancellations',
      desc: "Plans changed? No worries, enjoy the flexibility of free cancellations",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="22" stroke="#2d3748" stroke-width="2"/>
        <line x1="14" y1="14" x2="46" y2="46" stroke="#2d3748" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Wide range of fleet',
      desc: "Whether you're traveling solo or with a group, we have the perfect ride for every journey.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <rect x="8" y="22" width="44" height="20" rx="4" stroke="#2d3748" stroke-width="2" fill="none"/>
        <path d="M14 22l6-10h20l6 10" stroke="#2d3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <circle cx="18" cy="42" r="5" stroke="#2d3748" stroke-width="2" fill="none"/>
        <circle cx="42" cy="42" r="5" stroke="#2d3748" stroke-width="2" fill="none"/>
        <line x1="23" y1="42" x2="37" y2="42" stroke="#2d3748" stroke-width="2"/>
        <circle cx="22" cy="31" r="2" fill="#e6b800"/>
        <circle cx="38" cy="31" r="2" fill="#e6b800"/>
      </svg>`
    },
    {
      name: 'Baby Seat',
      desc: "Traveling with little ones? We've got safe, comfy baby seats to keep your family happy on the go.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
        <circle cx="30" cy="14" r="6" stroke="#2d3748" stroke-width="2" fill="none"/>
        <path d="M18 30c0-6 5-10 12-10s12 4 12 10" stroke="#2d3748" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M14 30h32l-4 16H18L14 30z" stroke="#2d3748" stroke-width="2" fill="none" stroke-linejoin="round"/>
        <path d="M22 46c0 4 3 6 8 6s8-2 8-6" stroke="#2d3748" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>`
    }
  ];
}
