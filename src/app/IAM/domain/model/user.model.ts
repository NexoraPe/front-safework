export interface User {
  id: number; // Tu backend usa number (según el código del profe) o string? Asumiré number por el ejemplo.
  companyId: number;
  fullName: string; // O fullName, según lo que devuelva el login
  email: string;
  roles: string[];
  token?: string; // Para facilitar el acceso al token
  phoneNumber?: string;
  createdAt?: string; // ISO Date
  updatedAt?: string; // ISO Date
}