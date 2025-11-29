import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../infrastructure/authentication.service';
import { SignInCommand } from '../domain/model/sign-in.command';
import { User } from '../domain/model/user.model';
import { SignUpCommand } from '../domain/model/sign-up.command';

@Injectable({
    providedIn: 'root'
})
export class IamStore {
    // Estado Reactivo (Observables)
    private _user = new BehaviorSubject<User | null>(null);
    private _isAuthenticated = new BehaviorSubject<boolean>(false);
    private _error = new BehaviorSubject<string | null>(null);

    // Exponemos los observables para que los componentes los consuman
    readonly user$ = this._user.asObservable();
    readonly isAuthenticated$ = this._isAuthenticated.asObservable();
    readonly error$ = this._error.asObservable();

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.checkInitialSession();
    }

    // Verificar si ya hay token al recargar la página
    private checkInitialSession() {
        // Aquí idealmente decodificarías el token o llamarías a un endpoint /me
        // Por ahora, si hay token, asumimos logueado
        if (localStorage.getItem('token')) {
            this._isAuthenticated.next(true);
        }
    }

    signIn(command: SignInCommand) {
        this._error.next(null); // Limpiar errores previos

        this.authService.signIn(command).subscribe({
            next: (user) => {
                console.log('Login Exitoso:', user);
                this._user.next(user);
                this._isAuthenticated.next(true);

                // Redirección post-login
                this.router.navigate(['/app']); // O a donde deban ir (incidents)
            },
            error: (err) => {
                console.error('Error en login:', err);
                this._error.next('Credenciales incorrectas o error de servidor');
                this._isAuthenticated.next(false);
            }
        });
    }

    signUp(command: SignUpCommand) {
        this._error.next(null);

        this.authService.signUp(command)
            .subscribe({
                next: () => {
                    console.log('Registro exitoso');
                    // AQUÍ ocurre la magia de la redirección
                    // Asegúrate que la ruta coincida con tu iam.routes.ts
                    this.router.navigate(['/login']);

                    // Opcional: Podrías mostrar un Toast/Notificación de éxito aquí
                },
                error: (err) => {
                    console.error('Error en registro:', err);
                    this._error.next('Error al registrar usuario. Intente nuevamente.');
                }
            });
    }

    signOut() {
        this.authService.logout();
        this._user.next(null);
        this._isAuthenticated.next(false);
        this.router.navigate(['/login']); // O login
    }
}