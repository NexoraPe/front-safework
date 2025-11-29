import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignInCommand } from '../domain/model/sign-in.command';
import { SignUpCommand } from '../domain/model/sign-up.command';
import { User } from '../domain/model/user.model';

// Definimos la respuesta "cruda" del backend aquí para no crear otro archivo
interface AuthResponseDTO {
    token: string;
    id: number;
    companyId: number;
    fullName: string;
    email: string;
    roles: string[];
}

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
        return this.http.post<AuthResponseDTO>(`${this.apiUrl}/sign-in`, command).pipe(
            tap(response => this.saveToken(response.token)),
            // Aquí hacemos de "Assembler": Transformamos DTO -> User Model
            map(dto => ({
                id: dto.id,
                fullName: dto.fullName,
                companyId: dto.companyId,
                email: dto.email,
                roles: dto.roles,
                token: dto.token
            }))
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
}