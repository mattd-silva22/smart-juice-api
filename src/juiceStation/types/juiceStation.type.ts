import { TAddress } from 'src/shared/types/address.type';
import { EJuiceStationStatus } from './juiceStationStatus.enum';

export type TJuiceStation = {
  id: string;
  name: string;
  status: EJuiceStationStatus;
  description: string;
  address: TAddress;
};
