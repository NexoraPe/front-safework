import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { IamStore } from '../application/iam.store'; // Asumiendo que IamStore tiene un método o señal para saber si está logueado

export const authenticationGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const iamStore = inject(IamStore); // Ojo con la dependencia circular aquí también

    // Opción A: Si tu Store tiene un signal o observable con valor actual
    // const isLogged = iamStore.isAuthenticated(); 

    // Opción B (Más segura para evitar ciclos si el store es complejo):
    const token = localStorage.getItem('token');

    if (token) {
        return true; // ¡Pase usted!
    } else {
        // No tiene pase, al login.
        return router.createUrlTree(['/login']);
    }
};