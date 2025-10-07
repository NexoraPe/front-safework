import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../../../shared/presentation/components/language-switcher/language-switcher';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-iam-layout',
  imports: [
    LanguageSwitcher,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './iam-layout.html',
  styleUrl: './iam-layout.css'
})
export class IamLayout {

}
