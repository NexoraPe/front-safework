import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Obtenemos el token del localStorage (o podrías inyectar un AuthService)
    const token = localStorage.getItem('token');

    // Solo inyectamos si existe y no es la cadena "null"
    if (token && token !== 'null') {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedReq);
    }

    // Si no hay token, pasa la petición tal cual (login/register)
    return next(req);
};