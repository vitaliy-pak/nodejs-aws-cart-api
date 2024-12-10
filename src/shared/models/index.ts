import { Request } from 'express';
import { User } from '../../users/models/user.model';

export interface AppRequest extends Request {
  user?: User
}
