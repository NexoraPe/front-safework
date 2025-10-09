import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface UserResource extends BaseResource {
  id: number;
  email: string;
  password: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  dni: string | null;
  phoneNumber: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
}

export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}
