import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { User } from '../domain/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = `${environment.baseApiBaseUrl}/authentication`; // http://localhost:8080/api/v1/authentication

    constructor(private http: HttpClient) { }

    /**
     * Maneja el Sign-In (Login)
     */
    signIn(command: SignInCommand): Observable<User> {
        return this.http.post<any>(`${this.apiUrl}/sign-in`, command).pipe(
            tap(response => this.saveToken(response.token)),
            map(response => {
                // 1. Decodificamos el token AQUÍ MISMO
                const payload = this.decodeToken(response.token);

                // 2. Construimos el usuario usando los datos del TOKEN (la fuente de la verdad)
                return {
                    id: payload.userId,         // Viene del token ("userId": 4)
                    companyId: payload.companyId, // Viene del token ("companyId": 1)
                    email: payload.sub,         // "worker2@gmail.com"
                    username: payload.sub,
                    // Como el token no tiene fullName, usamos el email o lo que venga en response
                    fullName: payload.sub,

                    // IMPORTANTE: El token tiene "role" (string), tu modelo quiere "roles" (array)
                    roles: [payload.role],
                    token: response.token
                } as User;
            })
        );
    }

    /**
     * Maneja el Sign-Up (Registro)
     */
    signUp(command: SignUpCommand): Observable<void> {
        // El sign-up usualmente devuelve 201 Created o un mensaje, no necesariamente el token directo
        // Si tu backend hace login automático tras registro, cambia 'void' por 'User'
        return this.http.post<void>(`${this.apiUrl}/sign-up`, command);
    }

    private saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    // --- HELPER PARA DECODIFICAR JWT SIN LIBRERÍA ---
    private decodeToken(token: string): any {
        try {
            // El JWT tiene 3 partes separadas por puntos. La segunda es el payload.
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Error decoding token', e);
            return {};
        }
    }

    getUserFromLocalStorage(): User | null {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const payload = this.decodeToken(token);

        // Verificamos que el token no haya expirado (opcional pero recomendado)
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
            this.logout();
            return null;
        }

        // Reconstruimos el usuario igual que en el login
        return {
            id: payload.userId,
            companyId: payload.companyId,
            email: payload.sub,
            fullName: payload.sub, // O lo que tengas disponible
            username: payload.sub,
            roles: [payload.role],
            token: token
        } as User;
    }
}