import { UserType } from 'src/core/api';

export interface Meta {
  id: string;
  name: string;
  username: string;
  img?: string;
  type: UserType;
  current?: boolean;
}
