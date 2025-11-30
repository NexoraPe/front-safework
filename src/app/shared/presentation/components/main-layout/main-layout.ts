import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { NgOptimizedImage } from '@angular/common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';


@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Toolbar,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    NgOptimizedImage,
    LanguageSwitcher,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

  sidebarOptions = [
    { link: '/app/profile', label: 'option.profile', icon: 'person' },
    { link: '/app/incidents', label: 'option.incidents', icon: 'warning' },
    { link: '/app/assignments', label: 'option.assignments', icon: 'assignment' },
    { link: '/app/notifications', label: 'option.notifications', icon: 'notifications' },
    { link: '/app/analytics', label: 'option.analytics', icon: 'analytics' }
  ];
}
