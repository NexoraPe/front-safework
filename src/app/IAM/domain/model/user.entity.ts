import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class User implements BaseEntity {
  //Atributes
  private _id: number;
  private _email: string;
  private _password: string;
  private _role: string;
  private _firstName: string | null;
  private _lastName: string | null;
  private _dni: string | null;
  private _phoneNumber: string | null;
  private _dateOfBirth: Date | null;
  private _gender: string | null;

  //Constructor
  constructor(
    user: {
      id: number;
      email: string;
      password: string;
      role: string;
      firstName?: string | null;
      lastName?: string | null;
      dni?: string | null;
      phoneNumber?: string | null;
      dateOfBirth?: Date | null;
      gender?: string | null
    }) {
    this._id = user.id;
    this._email = user.email;
    this._password = user.password;
    this._role = user.role;
    this._firstName = user.firstName ?? 'Usuario';
    this._lastName = user.lastName ?? null;
    this._dni = user.dni ?? null;
    this._phoneNumber = user.phoneNumber ?? null;
    this._dateOfBirth = user.dateOfBirth ?? null;
    this._gender = user.gender ?? null;
  }

  get id(): number{
    return this._id;
  }
  set id(value: number){
    this._id = value;
  }

  get email(): string{
    return this._email;
  }
  set email(value: string){
    this._email = value;
  }

  get password(): string{
    return this._password;
  }
  set password(value: string){
    this._password = value;
  }

  get role(): string{
    return this._role;
  }
  set role(value: string){
    this._role = value;
  }

  get firstName(): string | null{
    return this._firstName;
  }
  set firstName(value: string | null){
    this._firstName = value;
  }

  get lastName(): string | null{
    return this._lastName;
  }
  set lastName(value: string | null){
    this._lastName = value;
  }

  get dni(): string | null{
    return this._dni;
  }
  set dni(value: string | null){
    this._dni = value;
  }

  get phoneNumber(): string | null{
    return this._phoneNumber;
  }
  set phoneNumber(value: string | null){
    this._phoneNumber = value;
  }

  get dateOfBirth(): Date | null{
    return this._dateOfBirth;
  }
  set dateOfBirth(value: Date | null){
    this._dateOfBirth = value;
  }

  get gender(): string | null{
    return this._gender;
  }
  set gender(value: string | null){
    this._gender = value;
  }
}
