import { TAddress } from 'src/shared/types/address.type';

export type TUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
  address?: TAddress;
};

export type TAuthUser = {};
