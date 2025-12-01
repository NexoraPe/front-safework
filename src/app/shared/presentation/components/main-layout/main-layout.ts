import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../toolbar/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { NgOptimizedImage } from '@angular/common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

import { IamStore } from '../../../../IAM/application/iam.store'; // Ajusta la ruta



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

  // 1. Inyectamos el Store
  private iamStore = inject(IamStore);

  // 2. Definimos TODAS las opciones posibles (La lista maestra)
  private allOptions = [
    { link: '/app/profile', label: 'option.profile', icon: 'person' },
    { link: '/app/incidents', label: 'option.incidents', icon: 'warning' },
    { link: '/app/assignments', label: 'option.assignments', icon: 'assignment' }, // Esta es la conflictiva
    { link: '/app/notifications', label: 'option.notifications', icon: 'notifications' },
    { link: '/app/analytics', label: 'option.analytics', icon: 'analytics' }
  ];

  // 3. Esta es la variable que pasaremos al HTML (empieza vacía o llena, da igual)
  sidebarOptions: any[] = [];

  ngOnInit() {
    // 4. Nos suscribimos al usuario para ver sus roles
    this.iamStore.user$.subscribe(user => {
      if (user) {
        this.filterOptions(user.roles);
      }
    });
  }

  private filterOptions(roles: string[]) {
    // LÓGICA: Si es WORKER, filtramos 'assignments'. 
    // Si NO es WORKER (ej. Employer), mostramos todo.

    // Convertimos a mayúsculas por seguridad
    const isWorker = roles.map(r => r.toUpperCase()).includes('WORKER');

    if (isWorker) {
      // Devolvemos todas las opciones MENOS assignments
      this.sidebarOptions = this.allOptions.filter(opt => opt.link !== '/app/assignments');
    } else {
      // Si es Employer u otro, mostramos todo
      this.sidebarOptions = this.allOptions;
    }
  }
}
