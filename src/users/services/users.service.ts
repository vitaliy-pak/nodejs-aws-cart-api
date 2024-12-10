import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {}
    console.log("UsersService constructor");
  }

  findOne(userId: string): User {
    return this.users[ userId ];
  }

  createOne({ name, password }: User): User {
    const id = v4();
    const newUser = { id: name || id, name, password };

    this.users[ id ] = newUser;

    return newUser;
  }

}
