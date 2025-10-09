export interface User {
  id: number;
  email: string;
  password: string;
  role: 'worker' | 'employer';
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}
