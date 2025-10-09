import {User} from '../domain/model/user.entity';
import {UserResource, UsersResponse} from './users-response';
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';

export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse>{

  toEntityFromResource(resource: UserResource): User {
    return new User({
      id: resource.id,
      email: resource.email,
      password: resource.password,
      role: resource.role,
      firstName: resource.firstName ?? 'Usuario',
      lastName: resource.lastName ?? null,
      dni: resource.dni ?? null,
      phoneNumber: resource.phoneNumber ?? null,
      dateOfBirth: resource.dateOfBirth ?? null,
      gender: resource.gender ?? null
    });
  }

  toResourceFromEntity(entity: User): UserResource {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      firstName: entity.firstName ?? 'Usuario',
      lastName: entity.lastName ?? null,
      dni: entity.dni ?? null,
      phoneNumber: entity.phoneNumber ?? null,
      dateOfBirth: entity.dateOfBirth ?? null,
      gender: entity.gender ?? null
    } as UserResource;
  }

  toEntitiesFromResponse(response: UsersResponse): User[] {
    console.log(response);
    return response.users.map(resource => this.toEntityFromResource(resource as UserResource));
  }
}
