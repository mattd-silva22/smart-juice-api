import { TAddress } from 'src/shared/types/address.type';
import { TJuiceStationStatus } from './juiceStationStatus.enum';

export type TJuiceStation = {
  id: string;
  name: string;
  status: TJuiceStationStatus;
  description: string;
  address: TAddress;
};
