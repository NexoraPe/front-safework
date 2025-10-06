import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoginForm} from './IAM/presentation/views/login-form/login-form';
import {LanguageSwitcher} from './shared/presentation/components/language-switcher/language-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginForm, LanguageSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-safework');
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }

}
