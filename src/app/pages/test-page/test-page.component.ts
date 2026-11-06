import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-test-page',
    templateUrl: './test-page.component.html',
    styleUrls: ['./test-page.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})
export class TestPageComponent {
  showPhoneNumber: boolean = false;
}


type Country = {
  name: string;
  iso2: string;      // e.g., 'LK'
  dialCode: string;  // e.g., '+94'
  flag: string;      // emoji flag (optional)
  min?: number;      // min length for national number
  max?: number;      // max length for national number
};





